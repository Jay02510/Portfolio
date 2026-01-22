
import React, { useState } from 'react';
import { XIcon } from './Icons.tsx';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose, type }) => {
  const [lang, setLang] = useState<'EN' | 'KR'>('EN');

  if (!isOpen) return null;

  const content = {
    privacy: {
      EN: {
        title: "Privacy Policy",
        body: `
          Last Updated: May 2024
          
          1. Data Collection
          We collect minimal personal information necessary to provide educational services. This may include names and email addresses for account creation.
          
          2. Use of Data
          Your data is used solely to enhance the learning experience. We do not sell or trade your personal information to third parties.
          
          3. Student Data (COPPA/FERPA)
          We prioritize student safety. Our tools are designed to be compliant with major educational privacy standards. We do not track students across other websites.
          
          4. Security
          We use industry-standard encryption to protect your information. As these are MVP products, we continuously update our security protocols.
          
          5. Contact
          For privacy inquiries, contact: jsn.benjamin@gmail.com
        `
      },
      KR: {
        title: "개인정보 처리방침",
        body: `
          최종 수정일: 2024년 5월
          
          1. 데이터 수집
          교육 서비스를 제공하는 데 필요한 최소한의 개인정보만을 수집합니다. 여기에는 계정 생성을 위한 이름과 이메일 주소가 포함될 수 있습니다.
          
          2. 데이터 사용
          귀하의 데이터는 오로지 학습 경험을 개선하기 위해서만 사용됩니다. 당사는 귀하의 개인정보를 제3자에게 판매하거나 거래하지 않습니다.
          
          3. 학생 데이터 보호
          당사는 학생의 안전을 최우선으로 생각합니다. 당사의 도구는 주요 교육 개인정보 보호 표준을 준수하도록 설계되었습니다.
          
          4. 보안
          정보 보호를 위해 업계 표준 암호화 기술을 사용합니다. MVP 제품으로서 보안 프로토콜을 지속적으로 업데이트하고 있습니다.
          
          5. 문의
          개인정보 관련 문의: jsn.benjamin@gmail.com
        `
      }
    },
    terms: {
      EN: {
        title: "Terms of Service",
        body: `
          Last Updated: May 2024
          
          1. MVP Status
          These products are Minimum Viable Products (MVPs). They are provided "as is" for testing and feedback purposes.
          
          2. Use License
          Permission is granted to use these tools for personal or educational purposes. Commercial redistribution without consent is prohibited.
          
          3. User Feedback
          By providing feedback, you grant Jason Benjamin the right to use your suggestions to improve the tools.
          
          4. Limitations
          In no event shall the developer be liable for any damages arising out of the use or inability to use the tools.
          
          5. Governing Law
          These terms are governed by the laws applicable in the jurisdiction of the developer.
        `
      },
      KR: {
        title: "이용 약관",
        body: `
          최종 수정일: 2024년 5월
          
          1. MVP 상태
          본 제품은 MVP(최소 기능 제품)입니다. 테스트 및 피드백 목적으로 "있는 그대로" 제공됩니다.
          
          2. 사용 라이선스
          개인적 또는 교육적 목적으로 이 도구를 사용할 수 있는 권한이 부여됩니다. 동의 없는 상업적 재배포는 금지됩니다.
          
          3. 사용자 피드백
          피드백을 제공함으로써 귀하는 Jason Benjamin에게 도구 개선을 위해 귀하의 제안을 사용할 수 있는 권리를 부여하게 됩니다.
          
          4. 책임 제한
          개발자는 어떠한 경우에도 도구 사용 또는 사용 불능으로 인해 발생하는 손해에 대해 책임을 지지 않습니다.
          
          5. 준거법
          본 약관은 개발자 거주 지역의 관련 법률에 따릅니다.
        `
      }
    }
  };

  const activeContent = content[type][lang];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl glass-panel rounded-[2rem] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-alpine-950/50">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-light text-white font-display tracking-tight uppercase">
              {activeContent.title}
            </h2>
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'EN' ? 'bg-accent-gold text-alpine-950' : 'text-white/40 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('KR')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'KR' ? 'bg-accent-gold text-alpine-950' : 'text-white/40 hover:text-white'}`}
              >
                KR
              </button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-all">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-white/60 font-light text-sm leading-relaxed whitespace-pre-wrap">
          {activeContent.body}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 text-center bg-alpine-950/50">
          <button 
            onClick={onClose}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold hover:text-white transition-all"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModal;
