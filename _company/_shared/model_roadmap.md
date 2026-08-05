# 🤖 에이전트 모델 오케스트레이션 로드맵 (Local LLM ➔ Cloud API)

## 📌 1단계: 현재 적용 (Local LLM 기반 자원 최적화)

현재 프로젝트의 `agent_models.json` 파일에 적용된 **Ollama Local LLM** 배치 현황입니다. 개인정보 보호 및 오프라인 비용 제로(Zero Cost) 기반으로 고성능 에이전트 환경을 구축합니다.

```json
{
  "ceo": "qwen2.5:72b",
  "developer": "qwen2.5-coder:32b",
  "writer": "qwen2.5:32b",
  "researcher": "deepseek-r1:32b",
  "business": "qwen2.5:32b",
  "editor": "qwen2.5:32b",
  "youtube": "qwen2.5:14b",
  "instagram": "qwen2.5:14b",
  "designer": "gemma2:9b",
  "secretary": "gemma4:e4b"
}
```

### 🎯 에이전트별 배치 이유 (타당성)
- **🏢 CEO (`qwen2.5:72b`)**: 최고 성능의 72B 오픈소스 파라미터 모델로 에이전트 간 전체 종합 의사결정 수립
- **💻 Developer (`qwen2.5-coder:32b`)**: 코딩 특화 모델로 코드 생성 및 웹/PWA 시스템 빌드 오류 최소화
- **🔍 Researcher (`deepseek-r1:32b`)**: R1 사고/추론 모델로 심층 팩트체크 및 시장 데이터 분석
- **✍️ Writer/Editor (`qwen2.5:32b`)**: 풍부한 한국어 표현력 및 긴 글 기획 능력을 갖춘 32B 모델
- **🎥 Youtube/Instagram (`qwen2.5:14b`)**: 트렌드 키워드 탐지 및 댓글 감성 분석을 위한 가성비 14B 모델
- **🗓️ Secretary (`gemma4:e4b`)**: 일정 및 푸시 알림 루틴을 처리하기 위한 초경량 파싱 전용 모델

---

## 🚀 2단계: 차후 발전 구상 (Cloud API 확장 & 하이브리드 오케스트레이션)

프로젝트 서비스 규모가 확대되거나 외부 서비스 연동(SaaS) 시 **하이브리드(Hybrid) 폴백 시스템**으로 확장합니다.

### 🏛️ Cloud API 확장 매핑 구조

```
[ 에이전트 요청 ] 
       │
       ├──► 1차: Local LLM 처리 (기본 무임금/보안 자원)
       │
       └──► 2차 (복잡도/오류 발생 시): Cloud API 폴백 (Fall-back)
```

- **CEO & 전략가**: `gemini-1.5-pro` (2M 초대형 문맥)
- **코딩 개발자**: `claude-3-5-sonnet` (코드 생성 최고 품질)
- **글쓰기 작가**: `claude-3-5-sonnet` (자연스러운 한국어 문장)
- **대량 분석/마케팅**: `gemini-1.5-flash` / `gpt-4o-mini` (초고속 및 초저비용 처리)
