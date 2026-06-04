import { PortfolioData, Project } from './types.ts';

export interface ProjectMedia {
  label: string;
  url: string;
  type: 'pdf' | 'video';
}

export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
  betaCode?: string;
  spotsRemaining?: number;
  features?: string[];
  media?: ProjectMedia[];
  collaborationUrl?: string;
  engineDetails?: string;
  maturityBadge?: string;
}

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "Teacher & Builder",
  profileImageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1769135697/IMG_2852_p7w0p4.jpg",
  bio: "After ten years in the classroom, I learned that the best tools are the ones that work as they promise. My goal is to continue to build and solve problems for everyone associated with the classroom.",
  skills: [
    { name: "Workflow Optimization", level: 95, category: "Design" },
    { name: "EdTech AI Integration", level: 90, category: "AI/ML" },
    { name: "Full-Stack Development", level: 92, category: "Backend" },
    { name: "Interface Design", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Hours Saved Weekly", value: "2,400+", icon: "clock" },
    { label: "Parent Engagement", value: "98%", icon: "heart" },
    { label: "User Satisfaction", value: "1,200+", icon: "users" },
    { label: "Efficiency Boost", value: "4x", icon: "zap" }
  ],
  en: {
    bio: "After ten years in the classroom, I learned that the best tools are the ones that work as they promise. My goal is to continue to build and solve problems for everyone associated with the classroom.",
    projects: [
      {
        id: "chekki",
        title: "Chekki AI",
        category: "Tools" as const,
        description: "Homework help without the stress.",
        longDescription: "Designed an instant mobile camera parsing overlay that cuts language lesson preparation time from 30 minutes to under 5 seconds per worksheet. Runs under a strict 'Zero-Memory Policy' to ensure student data privacy and 100% data compliance.",
        friction: "The communication barrier between non-native speaking parents and complex school homework assignments.",
        flow: "A bilingual interface that simplifies homework tasks and provides guided explanations for parents.",
        impactLabel: "Preparation Time",
        impactValue: "30m down to <5s",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
        maturityBadge: "V1.2 LIVE PRODUCTION",
        engineDetails: "Stack: Claude 3.5 Sonnet API via custom XML prompt routing | Made for Korean bilingual parsing.",
        features: ["Bilingual AI Support", "Parent Guidance Mode", "Homework Simplifier", "Voice-to-Text Assistance"],
        tags: ["AI Assistant", "Bilingual Support"],
        imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
        imagePosition: "object-right",
        websiteUrl: "https://chekki-ai.vercel.app/",
        media: [
          { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' },
          { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' }
        ]
      },
      {
        id: "benchmark-explorer",
        title: "Benchmark Explorer",
        category: "K-12" as const,
        description: "Stop guessing what they missed.",
        longDescription: "A professional-grade system for tracking student growth and benchmarking. It provides teachers with clear, actionable data to identify learning gaps and personalize instruction.",
        friction: "Teachers often struggle with massive spreadsheets that don't clearly communicate student progress or specific needs.",
        flow: "Automatically transforms raw test scores into visual skill-maps and individual learning plans.",
        impactLabel: "Actionable",
        impactValue: "Zero guesswork",
        maturityBadge: "MVP | ARCHITECTURAL CASE STUDY",
        engineDetails: "Engine: Relational Airtable backend mapped to multi-variable automated reporting via Make logic pipelines.",
        features: ["Visual Skill Mapping", "Individual Learning Plans", "Automated Data Analysis", "PDF Report Generation"],
        tags: ["Data Visualization", "Classroom Strategy"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        demoUrl: "https://education-benchmark-system.vercel.app/",
      },
      {
        id: "eduplanner",
        title: "EduPlanner",
        category: "Tools" as const,
        description: "Schedules that actually work.",
        longDescription: "A sophisticated scheduling engine built to handle the complex requirements of modern schools. It automates room mapping, substitute management, and staff rotations.",
        friction: "Manual scheduling leads to human error, room conflicts, and hours of administrative overhead every week.",
        flow: "Intelligent conflict-resolution algorithms that suggest the best possible layout for your school's unique needs.",
        impactLabel: "Stability",
        impactValue: "Zero conflicts",
        maturityBadge: "MVP | ACTIVE BETA",
        engineDetails: "Engine: Google Gemini reasoning model with recursive structural constraint re-weaving.",
        features: ["Automatic Room Mapping", "Conflict Resolution Engine", "Staff Rotation Management", "Live Admin Dashboard"],
        tags: ["Operations", "Productivity"],
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
        demoUrl: "https://scheduling-app-five.vercel.app/",
      },
      {
        id: "consultation-pipeline",
        title: "Automated Consult Pipeline",
        category: "Tools" as const,
        description: "Zero-maintenance admin data operations.",
        longDescription: "Eliminated manual data entry errors and reduced teacher admin reporting time by an estimated 80% (saving 15+ hours weekly) by architecting a relational database cluster with strict class-level row segregation controls.",
        friction: "Educational staff spend up to 15 hours weekly executing manual data transformations across intake files, roster spreadsheets, and custom summaries.",
        flow: "Intake records from Fillout write directly to Airtable, triggering automated Make.com routers that coordinate AI report construction and render results securely to a Softr client dashboard.",
        impactLabel: "Operations Saved",
        impactValue: "80% Time Reduction (15h/wk)",
        maturityBadge: "MVP | PRODUCTION PIPELINE",
        engineDetails: "Engine: Relational Airtable database & Make.com workflows driving automated Softr client portals.",
        features: ["Fillout Teacher Intake", "Relational Airtable Database", "Make.com Automation Routers", "Softr Client Portals"],
        tags: ["Integration", "Operations"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "lead-enrichment",
        title: "B2B Lead Enrichment CRM",
        category: "Tools" as const,
        description: "Targeted, bilingual B2B outreach automation.",
        longDescription: "An automated B2B pipeline discovering local South Korean English academies and drafting hyper-personalized, high-converting bilingual cold outreach campaigns based on founder credentials.",
        friction: "Manually finding targets on regional directories, cleaning disorganized web metadata, and writing custom-tailored bilingual emails takes hours per lead.",
        flow: "Pulls local academy data, cleans raw HTML tags, queries Firebase to detect pre-saved duplicates, processes batches cleanly, and generates 1-click personalized Gmail deep links.",
        impactLabel: "Outreach",
        impactValue: "4x response rate",
        maturityBadge: "MVP | PRODUCTION CRM",
        engineDetails: "Engine: Node/Express proxy routing regional maps data through structured gemini-3-flash translation models.",
        features: ["Naver Map API Integration", "Bilingual Email Synthesizer", "Firebase CRM Tracker", "1-Click Gmail deep-links"],
        tags: ["B2B Sales", "Automation"],
        imageUrl: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
        images: [
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png"
        ],
      }
    ]
  },
  ko: {
    bio: "10년 동안 직접 교단에 서서 매일 아이들과 씨름하며 내린 결론은, 가장 훌륭한 교육 도구란 약속한 대로 빈틈없이 작동하는 도구라는 점입니다. 제 목표는 앞으로도 배움터의 교직원, 부모님, 학생 모두를 위한 최고의 도구를 지치지 않고 만들어내는 것입니다.",
    projects: [
      {
        id: "chekki",
        title: "Chekki AI (체키)",
        category: "Tools" as const,
        description: "학습 지도 스트레스에서 완전히 벗어나세요.",
        longDescription: "스마트폰 카메라로 스캔하는 즉시 수업 준비 시간을 30분에서 5초 이내로 단축하는 혁신적인 이중언어 비서입니다. 완벽한 자녀 및 학생 프라이버시 보호를 위해 철저한 'Zero-Memory Policy' 하에서 안전하게 작동합니다.",
        friction: "영어 텍스트에 대한 지식 격차로 인해 영어로 기술된 학생의 원어민 과제물에 대한 일체 학부모 지도가 도난당하는 상황.",
        flow: "구글 멀티모달 추론 가이드가 원본을 구조화해내고 부모님 스스로가 직접 발음 지도가 가능케하는 이중언어 분석 스크립트 작성.",
        impactLabel: "수업 준비 시간",
        impactValue: "30분 → 5초 단축",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
        maturityBadge: "V1.2 영구 가동 상태",
        engineDetails: "엔진: Claude 3.5 Sonnet 원천 지시문 프록시 설계 | 완벽 구조화된 전처리 한국 한글 발음 기호 매핑 가이드.",
        features: ["이중언어 지도 보조", "한글 발음 안내 스크립트", "이미지 문서 검독 파서", "음성 안내 엔진 연동"],
        tags: ["AI 어시스턴트", "이중언어 파이프라인"],
        imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
        imagePosition: "object-right",
        websiteUrl: "https://chekki-ai.vercel.app/",
        media: [
          { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' },
          { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' }
        ]
      },
      {
        id: "benchmark-explorer",
        title: "Benchmark Explorer (학업 벤치마크)",
        category: "K-12" as const,
        description: "놓치고 있던 진짜 학업 결손을 진찰하세요.",
        longDescription: "사서 적는 정성 관찰 결과를 정량 점수로 즉각 매핑하여 지도 지표를 한눈에 도출하는 전문 평가 시스템입니다. 교원들이 엑셀 수동 배치에 매달릴 공수를 개인 맞춤 지휘 시간으로 돌려줍니다.",
        friction: "행정 수지 엑셀을 가공하느라 야근을 도맡고 학부모를 위한 맞춤 학습 분석 보고서를 쓰느라 정체되는 진짜 강의 역량.",
        flow: "정렬된 관찰 평가 결과가 Airtable 레코드로 수렴해 레이더형 역량 지표 차트 생성 및 이중언어 보고문 자동 생성.",
        impactLabel: "처방 신속도",
        impactValue: "선제 보강 도출",
        maturityBadge: "MVP | 아키텍처 실체 분석",
        engineDetails: "스키마: Airtable 데이터베이스 및 트랜잭션 수위 Make 워크플로 통합 보고 서비스 빌드.",
        features: ["방사 레이더 역량 차트", "개인 성장 포트폴리오", "실시간 정량화 추적", "PDF 일람 보고 즉시 빌드"],
        tags: ["데이터 시각화", "지도 관리 전략"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        demoUrl: "https://education-benchmark-system.vercel.app/",
      },
      {
        id: "eduplanner",
        title: "EduPlanner Pro (무인 스케줄러)",
        category: "Tools" as const,
        description: "충돌과 마찰이 완전 소거되는 지능형 시간표.",
        longDescription: "학내 수많은 교원, 활용 교실 한계치, 피로 분산율, 교과 최소 연한 가치 등의 수많은 규칙을 인공지능이 무한 대조 연산해 단 10분 만에 충돌 수치 0%인 완벽 시간표 설계도를 편성하는 SaaS형 시간표 조립기입니다.",
        friction: "변수 충돌 제어가 무리하여 학교 교직원들이 칠판에 일일이 부착해가며 수십 시간을 소모하던 행정 낭비.",
        flow: "구글 제미나이 지능형 프로와 플래시 알고리즘을 결합해 무수히 우회 편조 기법을 검증하고 즉각 불완전 노드 타협 완료.",
        impactLabel: "시간표 신뢰도",
        impactValue: "충돌 오작동 0%",
        maturityBadge: "MVP | 라이브 베타 가동 상태",
        engineDetails: "구조: Google Gemini 추론 기반 다단계 무인 제약 충돌 해결 시간표 컴파일링 엔진.",
        features: ["교실 가용 분배 최적화", "실시간 충돌 방지 차단부", "교직원 순환 휴무 연산", "라이브 조정 대시보드"],
        tags: ["행정 혁신", "지능형 오퍼레이션"],
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
        demoUrl: "https://scheduling-app-five.vercel.app/",
      },
      {
        id: "consultation-pipeline",
        title: "Automated Consult Pipeline",
        category: "Tools" as const,
        description: "보고서 중복 취합 없는 완벽 데이터 가교.",
        longDescription: "수강 상담 수집 직후 한/영 맞춤 분석 보고서를 합성하여 자동 전달하는 파이프라인입니다. 데이터 입력 수동 실수를 전면 소거하고, 담당 교원만 소속 클래스 자료를 접근하도록 격리 구성해 야근 시간을 80%(주 15시간) 감소시켰습니다.",
        friction: "매 학과 주기와 학칙 변동 기록이 터질 때마다 상담 내역을 손으로 정리 배송하느라 주말 야근이 소모되는 악순환.",
        flow: "가볍고 빠른 입력창 클릭 직시 Airtable 행 정산, Make 분기점이 AI 보고 구성 후 Softr 학부모 전용 행 암호 영역에 직배송.",
        impactLabel: "업무 감소율",
        impactValue: "아큐트 야근 80% 소거(주15h)",
        maturityBadge: "MVP | 사설 프로덕션 망",
        engineDetails: "엔진: Airtable 관계형 데이터베이스 및 Make 흐름 포털 제어.",
        features: ["디지털 사전 면담 창", "관계형 대형 데이터 가교", "Make 지능 연동 라우터", "전용 암호 가방 뷰어"],
        tags: ["데이터 통합", "업무 흐름 자동화"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "lead-enrichment",
        title: "B2B Lead Enrichment CRM",
        category: "Tools" as const,
        description: "타겟 발굴부터 이메일 제안까지 완전 자동화.",
        longDescription: "지역 지도 데이터베이스를 정밀하게 자동 수집 및 중복 정화하고, 제미나이 제어 편조로 베테랑 10년 연차 학업 주체 톤에 어울리는 극도의 매너 이메일 발송 딥링크를 원클릭 제공하는 스마트 아웃바운드 CRM 엔진입니다.",
        friction: "HTML 찌꺼기가 섞여 엉망인 원물 주소록을 손으로 타이핑 대조하고, 타겟 파트너에 수십 편씩 수동 구애 영업 메일을 쓰느라 소모되는 마케터 에포트.",
        flow: "지도 크롤러 데이터 가공, Firestore 이중 커뮤니케이션 검사 가동, 대표 역량 정합 메일 딥링크 발적 1초 연쇄 수행.",
        impactLabel: "제안 성사도",
        impactValue: "파트너 전환 실적 4x 급증",
        maturityBadge: "MVP | 실가동 어드민 패널",
        engineDetails: "컴팩트: Express 파싱 게이트웨이 및 Google Gemini 정형 템플레이팅 일치 구조화.",
        features: ["인스턴스 주소 파싱", "네이버 ID 중복 필터링", "디바이스별 발송 스로틀링", "지메일 1초 딥 연동"],
        tags: ["B2B 영업 제어", "마케팅 자동화"],
        imageUrl: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
        images: [
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png"
        ],
      }
    ]
  },
  // English version as default root projects for backward compatibility
  projects: [
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools" as const,
      description: "Homework help without the stress.",
      longDescription: "Designed an instant mobile camera parsing overlay that cuts language lesson preparation time from 30 minutes to under 5 seconds per worksheet. Runs under a strict 'Zero-Memory Policy' to ensure student data privacy and 100% data compliance.",
      friction: "The communication barrier between non-native speaking parents and complex school homework assignments.",
      flow: "A bilingual interface that simplifies homework tasks and provides guided explanations for parents.",
      impactLabel: "Preparation Time",
      impactValue: "30m down to <5s",
      collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
      maturityBadge: "V1.2 LIVE PRODUCTION",
      engineDetails: "Stack: Claude 3.5 Sonnet API via custom XML prompt routing | Made for Korean bilingual parsing.",
      features: ["Bilingual AI Support", "Parent Guidance Mode", "Homework Simplifier", "Voice-to-Text Assistance"],
      tags: ["AI Assistant", "Bilingual Support"],
      imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      imagePosition: "object-right",
      websiteUrl: "https://chekki-ai.vercel.app/",
      media: [
        { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' },
        { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' }
      ]
    },
    {
      id: "benchmark-explorer",
      title: "Benchmark Explorer",
      category: "K-12" as const,
      description: "Stop guessing what they missed.",
      longDescription: "A professional-grade system for tracking student growth and benchmarking. It provides teachers with clear, actionable data to identify learning gaps and personalize instruction.",
      friction: "Teachers often struggle with massive spreadsheets that don't clearly communicate student progress or specific needs.",
      flow: "Automatically transforms raw test scores into visual skill-maps and individual learning plans.",
      impactLabel: "Actionable",
      impactValue: "Zero guesswork",
      maturityBadge: "MVP | ARCHITECTURAL CASE STUDY",
      engineDetails: "Engine: Relational Airtable backend mapped to multi-variable automated reporting via Make logic pipelines.",
      features: ["Visual Skill Mapping", "Individual Learning Plans", "Automated Data Analysis", "PDF Report Generation"],
      tags: ["Data Visualization", "Classroom Strategy"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "eduplanner",
      title: "EduPlanner",
      category: "Tools" as const,
      description: "Schedules that actually work.",
      longDescription: "A sophisticated scheduling engine built to handle the complex requirements of modern schools. It automates room mapping, substitute management, and staff rotations.",
      friction: "Manual scheduling leads to human error, room conflicts, and hours of administrative overhead every week.",
      flow: "Intelligent conflict-resolution algorithms that suggest the best possible layout for your school's unique needs.",
      impactLabel: "Stability",
      impactValue: "Zero conflicts",
      maturityBadge: "MVP | ACTIVE BETA",
      engineDetails: "Engine: Google Gemini reasoning model with recursive structural constraint re-weaving.",
      features: ["Automatic Room Mapping", "Conflict Resolution Engine", "Staff Rotation Management", "Live Admin Dashboard"],
      tags: ["Operations", "Productivity"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    },
    {
      id: "consultation-pipeline",
      title: "Automated Consult Pipeline",
      category: "Tools" as const,
      description: "Zero-maintenance admin data operations.",
      longDescription: "Eliminated manual data entry errors and reduced teacher admin reporting time by an estimated 80% (saving 15+ hours weekly) by architecting a relational database cluster with strict class-level row segregation controls.",
      friction: "Educational staff spend up to 15 hours weekly executing manual data transformations across intake files, roster spreadsheets, and custom summaries.",
      flow: "Intake records from Fillout write directly to Airtable, triggering automated Make.com routers that coordinate AI report construction and render results securely to a Softr client dashboard.",
      impactLabel: "Operations Saved",
      impactValue: "80% Time Reduction (15h/wk)",
      maturityBadge: "MVP | PRODUCTION PIPELINE",
      engineDetails: "Engine: Relational Airtable database & Make.com workflows driving automated Softr client portals.",
      features: ["Fillout Teacher Intake", "Relational Airtable Database", "Make.com Automation Routers", "Softr Client Portals"],
      tags: ["Integration", "Operations"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "lead-enrichment",
      title: "B2B Lead Enrichment CRM",
      category: "Tools" as const,
      description: "Targeted, bilingual B2B outreach automation.",
      longDescription: "An automated B2B pipeline discovering local South Korean English academies and drafting hyper-personalized, high-converting bilingual cold outreach campaigns based on founder credentials.",
      friction: "Manually finding targets on regional directories, cleaning disorganized web metadata, and writing custom-tailored bilingual emails takes hours per lead.",
      flow: "Pulls local academy data, cleans raw HTML tags, queries Firebase to detect pre-saved duplicates, processes batches cleanly, and generates 1-click personalized Gmail deep links.",
      impactLabel: "Outreach",
      impactValue: "4x response rate",
      maturityBadge: "MVP | PRODUCTION CRM",
      engineDetails: "Engine: Node/Express proxy routing regional maps data through structured gemini-3-flash translation models.",
      features: ["Naver Map API Integration", "Bilingual Email Synthesizer", "Firebase CRM Tracker", "1-Click Gmail deep-links"],
      tags: ["B2B Sales", "Automation"],
      imageUrl: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
      images: [
        "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
        "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png",
        "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png"
      ],
    }
  ]
};
