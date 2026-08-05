import sys
import json
import urllib.request
import traceback

def log(msg):
    # Since stdio is used for JSON-RPC, we must log to stderr!
    sys.stderr.write(f"[LMStudio Bridge] {msg}\n")
    sys.stderr.flush()

def get_models():
    try:
        req = urllib.request.Request("http://localhost:1234/v1/models", method="GET")
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode('utf-8'))
            return [m["id"] for m in data.get("data", [])]
    except Exception as e:
        log(f"Error fetching models: {e}")
        return []

def call_model(prompt, model=None, system_prompt=None, temperature=0.7, max_tokens=2048):
    try:
        loaded_models = get_models()
        if not loaded_models:
            # Try using model name or fallback
            model_name = model or "local-model"
        else:
            model_name = model if (model and model in loaded_models) else loaded_models[0]
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        payload = {
            "model": model_name,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        req_data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            "http://localhost:1234/v1/chat/completions",
            data=req_data,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        
        with urllib.request.urlopen(req, timeout=120) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            choices = res_data.get("choices", [])
            if choices:
                return choices[0].get("message", {}).get("content", "")
            return "No response content from model."
    except Exception as e:
        log(f"Error calling model: {e}")
        return f"Error calling local model via LM Studio: {e}. Please ensure LM Studio is running at http://localhost:1234 and a model is loaded."

def handle_request(req):
    method = req.get("method")
    req_id = req.get("id")
    
    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "lmstudio-bridge",
                    "version": "1.0.0"
                }
            }
        }
    elif method == "notifications/initialized":
        return None
    elif method == "ping":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {}
        }
    elif method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "list_local_models",
                        "description": "List all active models currently loaded and available in the local LM Studio instance.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {}
                        }
                    },
                    {
                        "name": "call_local_model",
                        "description": "Send a prompt to the local LM Studio instance and get the generated response.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "prompt": {
                                    "type": "string",
                                    "description": "The prompt or instruction to send to the local model."
                                },
                                "model": {
                                    "type": "string",
                                    "description": "Optional name of the model to use. If not specified, the first loaded model will be used."
                                },
                                "system_prompt": {
                                    "type": "string",
                                    "description": "Optional system instruction to set the model's persona/behavior."
                                },
                                "temperature": {
                                    "type": "number",
                                    "description": "Optional sampling temperature (default 0.7)."
                                },
                                "max_tokens": {
                                    "type": "integer",
                                    "description": "Optional maximum tokens to generate (default 2048)."
                                }
                            },
                            "required": ["prompt"]
                        }
                    }
                ]
            }
        }
    elif method == "tools/call":
        params = req.get("params", {})
        tool_name = params.get("name")
        arguments = params.get("arguments", {})
        
        if tool_name == "list_local_models":
            models = get_models()
            if not models:
                text = "No models are currently loaded in LM Studio. Please load a model in the LM Studio interface."
            else:
                text = "Available local models:\n" + "\n".join(f"- {m}" for m in models)
            
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": text}],
                    "isError": False
                }
            }
            
        elif tool_name == "call_local_model":
            prompt = arguments.get("prompt")
            model = arguments.get("model")
            system_prompt = arguments.get("system_prompt")
            temperature = arguments.get("temperature", 0.7)
            max_tokens = arguments.get("max_tokens", 2048)
            
            if not prompt:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "error": {
                        "code": -32602,
                        "message": "Missing required argument 'prompt'"
                    }
                }
                
            res_text = call_model(prompt, model, system_prompt, temperature, max_tokens)
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": res_text}],
                    "isError": False
                }
            }
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": -32601,
                    "message": f"Method not found: {tool_name}"
                }
            }
    else:
        # Standard JSON-RPC error or ignore notifications
        if req_id is not None:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": -32601,
                    "message": f"Method not found: {method}"
                }
            }
        return None

def main():
    log("LM Studio MCP Bridge started.")
    try:
        for line in sys.stdin:
            line = line.strip()
            if not line:
                continue
            try:
                req = json.loads(line)
                res = handle_request(req)
                if res is not None:
                    sys.stdout.write(json.dumps(res) + "\n")
                    sys.stdout.flush()
            except Exception as e:
                log(f"Error parsing/handling line: {e}")
                log(traceback.format_exc())
    except Exception as e:
        log(f"Fatal error in main loop: {e}")

if __name__ == "__main__":
    main()
