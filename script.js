(() => {
  "use strict";

  const STORAGE_KEY = "geneticsEscapeSave";
  const SAVE_VERSION = 1;
  const ROOM_ORDER = [
    "basic",
    "pedigree",
    "blood",
    "sex",
    "final"
  ];

  const rooms = {
    basic: {
      name: "유전 기초 교실",
      keyName: "파란 열쇠",
      color: "blue",
      image: "classroom-basic.png",
      concepts: [
        "DNA는 유전 정보를 저장하는 물질입니다.",
        "유전자는 특정 기능에 관여하는 DNA의 한 구간이며, 염색체는 DNA와 단백질로 이루어진 구조입니다.",
        "유전자형은 대립유전자의 조합, 표현형은 관찰되는 특성입니다.",
        "우성은 이형접합에서도 표현된다는 뜻이며 더 강하거나 좋은 형질이라는 뜻이 아닙니다.",
        "단일 유전자 모형은 사람의 모든 특징을 설명하지 못합니다."
      ]
    },

    pedigree: {
      name: "가계도 분석실",
      keyName: "초록 열쇠",
      color: "green",
      image: "classroom-pedigree.png",
      concepts: [
        "사각형은 남성, 원은 여성을 나타내며 채워진 도형은 해당 형질이 나타난 가상 인물입니다.",
        "세대는 로마 숫자, 개인은 왼쪽부터 아라비아 숫자로 읽습니다.",
        "상염색체 열성 모형에서 형질이 나타난 사람은 aa입니다.",
        "상염색체 우성 모형에서 형질이 나타나지 않은 사람은 aa입니다.",
        "가계도는 가능성을 추론하는 학습 모형이며 실제 개인을 진단하지 않습니다."
      ]
    },

    blood: {
      name: "ABO 혈액형 교실",
      keyName: "빨간 열쇠",
      color: "red",
      image: "classroom-blood.png",
      concepts: [
        "A형은 IᴬIᴬ 또는 Iᴬi, B형은 IᴮIᴮ 또는 Iᴮi입니다.",
        "AB형은 IᴬIᴮ, O형은 ii입니다.",
        "Iᴬ와 Iᴮ는 공동우성이고 i에 대해서는 우성입니다.",
        "각 출생의 확률은 독립적이며 실제 적은 수의 자녀에게 정확한 비율로 나타난다는 뜻은 아닙니다.",
        "혈액형만으로 실제 친자 관계를 확정할 수 없습니다."
      ]
    },

    sex: {
      name: "성염색체 유전 교실",
      keyName: "보라색 열쇠",
      color: "purple",
      image: "classroom-sex-linked.png",
      concepts: [
        "학교 교육과정의 단순화된 모형에서 일반적으로 XX와 XY 구성을 다룹니다.",
        "X 염색체 연관 열성 대립유전자를 하나 가진 이형접합 XX 개인을 보인자라고 할 수 있습니다.",
        "XY 개인은 X 염색체의 대립유전자가 하나이므로 열성 대립유전자도 표현될 수 있습니다.",
        "성염색체만으로 개인의 모든 생물학적 특성을 설명할 수 없습니다.",
        "모든 사례는 가상이며 유전질환은 사람의 가치와 무관합니다."
      ]
    },

    final: {
      name: "종합 문제 교실",
      keyName: "황금 열쇠",
      color: "gold",
      image: "classroom-final.png",
      concepts: [
        "용어를 정확히 구분하고 자료에 주어진 유전 모형을 먼저 확인하세요.",
        "표현형에서 가능한 유전자형이 하나인지 둘 이상인지 살펴보세요.",
        "가계도, 퍼넷 사각형, ABO와 X 연관 유전의 조건을 구분하세요.",
        "확률은 가능한 결과를 나타내며 개별 가족의 실제 결과를 보장하지 않습니다.",
        "모든 문제는 독립적으로 풀 수 있습니다."
      ]
    }
  };

  const P = (
    id,
    room,
    type,
    question,
    choices,
    answer,
    explanation,
    wrongExplanations,
    concept,
    hint,
    difficulty = 1,
    extra = {}
  ) => ({
    id,
    room,
    locationId: id,
    type,
    question,
    choices,
    answer,
    explanation,
    wrongExplanations,
    concept,
    hint,
    difficulty,
    keyId: `${room}-key-${id.slice(-2)}`,
    ...extra
  });

  const questions = [
    P(
      "basic-01",
      "basic",
      "multiple-choice",
      "DNA, 유전자, 염색체의 관계를 가장 적절하게 설명한 것은?",
      [
        "유전자는 DNA의 특정 구간이며 DNA는 단백질과 함께 염색체를 이룬다.",
        "DNA는 유전자 내부의 단백질이다.",
        "염색체는 유전자와 관계없는 세포 소기관이다.",
        "유전자와 염색체는 언제나 같은 뜻이다."
      ],
      0,
      "유전자는 기능에 관여하는 DNA의 구간이고, DNA는 단백질과 함께 염색체를 구성합니다.",
      [
        "올바른 관계입니다.",
        "DNA는 단백질이 아니라 핵산입니다.",
        "염색체는 DNA를 포함합니다.",
        "서로 관련되지만 같은 뜻은 아닙니다."
      ],
      "DNA·유전자·염색체",
      "가장 작은 정보 구간에서 더 큰 포장 구조로 생각해 보세요."
    ),

    P(
      "basic-02",
      "basic",
      "true-false",
      "‘우성 형질은 열성 형질보다 강하고 생존에 유리하다.’는 설명은 옳다.",
      [
        "참",
        "거짓"
      ],
      1,
      "우성은 이형접합에서 표현되는 관계를 뜻할 뿐 강함·우수함·생존 이점을 뜻하지 않습니다.",
      [
        "우성과 유리함을 혼동했습니다.",
        "옳습니다."
      ],
      "우성과 열성",
      "우성이라는 말이 가치 판단인지, 발현 관계인지 구분하세요."
    ),

    P(
      "basic-03",
      "basic",
      "multiple-choice",
      "완두의 한 유전자에서 대립유전자가 A와 a이고 개체의 조합이 Aa일 때, Aa를 가리키는 용어는?",
      [
        "표현형",
        "유전자형",
        "염색체 수",
        "환경 요인"
      ],
      1,
      "Aa처럼 대립유전자의 조합을 나타낸 것이 유전자형입니다.",
      [
        "표현형은 관찰되는 특성입니다.",
        "옳습니다.",
        "염색체 수와 다른 개념입니다.",
        "유전적 조합을 나타낸 것입니다."
      ],
      "유전자형",
      "문자 조합과 관찰되는 모습 중 어느 쪽인지 생각하세요."
    ),

    P(
      "basic-04",
      "basic",
      "multiple-select",
      "다음 중 과학적으로 적절한 설명을 모두 선택하세요.",
      [
        "열성 대립유전자는 표현되지 않는 세대에서도 전달될 수 있다.",
        "표현형은 유전자와 환경의 영향을 함께 받을 수 있다.",
        "사람의 키는 하나의 우성 유전자만으로 결정된다.",
        "우성 대립유전자는 항상 집단에서 더 흔하다."
      ],
      [0, 1],
      "열성 대립유전자는 이형접합 상태로 전달될 수 있고, 많은 표현형은 유전과 환경의 영향을 함께 받습니다.",
      [
        "적절합니다.",
        "적절합니다.",
        "키는 많은 유전자와 환경이 관여하는 복합 형질입니다.",
        "우성과 집단 내 빈도는 별개입니다."
      ],
      "유전 모형의 한계",
      "‘해당하는 것을 모두 선택하세요.’ 단일 유전자 모형으로 모든 사람 특징을 설명할 수 있는지도 살펴보세요."
    ),

    P(
      "basic-05",
      "basic",
      "punnett",
      "Aa × Aa에서 가능한 자녀의 유전자형으로 퍼넷 사각형을 완성하세요.",
      [],
      ["AA", "Aa", "Aa", "aa"],
      "두 부모의 생식세포는 각각 A와 a입니다. 조합은 AA, Aa, Aa, aa이므로 유전자형 비율은 1:2:1입니다.",
      [],
      "퍼넷 사각형",
      "각 칸에 위쪽 대립유전자와 왼쪽 대립유전자를 하나씩 합치세요.",
      2,
      {
        parents: ["Aa", "Aa"],
        gametes: [
          ["A", "a"],
          ["A", "a"]
        ],
        genotypeRatio:
          "AA 1/4(25%), Aa 2/4(50%), aa 1/4(25%)",
        phenotypeRatio:
          "A가 완전 우성인 모형: 우성 표현형 3/4(75%), 열성 표현형 1/4(25%)"
      }
    ),

    P(
      "pedigree-01",
      "pedigree",
      "multiple-choice",
      "가계도에서 내부가 채워진 원은 무엇을 뜻하는가?",
      [
        "형질이 나타난 여성",
        "형질이 나타난 남성",
        "형질이 나타나지 않은 여성",
        "세대 번호"
      ],
      0,
      "원은 여성, 채움은 조사하는 형질이 나타남을 뜻합니다.",
      [
        "옳습니다.",
        "남성은 사각형입니다.",
        "채워지지 않아야 합니다.",
        "세대는 로마 숫자로 표시합니다."
      ],
      "가계도 기호",
      "모양과 채움의 뜻을 따로 해석하세요.",
      1,
      {
        visual: "pedigree"
      }
    ),

    P(
      "pedigree-02",
      "pedigree",
      "multiple-choice",
      "가계도에서 ‘II-3’은 무엇을 뜻하는가?",
      [
        "2세대의 왼쪽에서 세 번째 개인",
        "3세대의 두 번째 개인",
        "2번 염색체의 3번째 유전자",
        "형질이 두 번 나타난 세 번째 개인"
      ],
      0,
      "로마 숫자 II는 2세대, 아라비아 숫자 3은 그 세대에서 왼쪽부터 세 번째 개인입니다.",
      [
        "옳습니다.",
        "순서가 바뀌었습니다.",
        "염색체 표기가 아닙니다.",
        "형질 횟수가 아닙니다."
      ],
      "세대와 개인 번호",
      "로마 숫자와 아라비아 숫자의 역할을 구분하세요.",
      1,
      {
        visual: "pedigree"
      }
    ),

    P(
      "pedigree-03",
      "pedigree",
      "multiple-choice",
      "상염색체 열성 모형에서 형질이 나타나지 않은 두 부모에게 형질이 나타난 자녀(aa)가 태어났다. 부모의 가능한 유전자형은?",
      [
        "두 부모 모두 Aa",
        "두 부모 모두 AA",
        "한 부모 AA, 다른 부모 aa",
        "두 부모 모두 aa"
      ],
      0,
      "자녀가 aa이므로 각 부모가 a를 전달해야 하고, 부모에게 형질이 나타나지 않았으므로 두 부모는 Aa입니다.",
      [
        "옳습니다.",
        "a를 전달할 수 없습니다.",
        "aa 부모에게는 형질이 나타납니다.",
        "두 부모 모두 형질이 나타납니다."
      ],
      "상염색체 열성",
      "aa 자녀의 a가 각각 어디서 왔는지 생각하세요.",
      2,
      {
        visual: "pedigree"
      }
    ),

    P(
      "pedigree-04",
      "pedigree",
      "multiple-select",
      "상염색체 우성 모형에서 형질이 나타나는 개인의 가능한 유전자형을 모두 선택하세요.",
      [
        "AA",
        "Aa",
        "aa"
      ],
      [0, 1],
      "A가 완전 우성인 단순 모형에서 AA와 Aa는 우성 표현형이고 aa는 열성 표현형입니다.",
      [
        "가능합니다.",
        "가능합니다.",
        "형질이 나타나지 않습니다."
      ],
      "상염색체 우성",
      "‘해당하는 것을 모두 선택하세요.’ A가 하나만 있어도 표현되는지 확인하세요."
    ),

    P(
      "pedigree-05",
      "pedigree",
      "true-false",
      "가계도만 보고 실제 개인의 유전질환을 확정적으로 진단할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "가계도는 유전 양상과 가능성을 추론하는 자료이며, 실제 진단에는 임상 정보와 적절한 검사가 필요합니다.",
      [
        "확정 진단으로 사용할 수 없습니다.",
        "옳습니다."
      ],
      "가계도의 한계",
      "가능성 추론과 실제 의료 진단은 같은지 생각하세요."
    ),

    P(
      "blood-01",
      "blood",
      "multiple-select",
      "A형 표현형이 가능한 유전자형을 모두 선택하세요.",
      [
        "IᴬIᴬ",
        "Iᴬi",
        "IᴬIᴮ",
        "ii"
      ],
      [0, 1],
      "A형은 IᴬIᴬ 또는 Iᴬi입니다.",
      [
        "가능합니다.",
        "가능합니다.",
        "AB형입니다.",
        "O형입니다."
      ],
      "ABO 유전자형",
      "‘해당하는 것을 모두 선택하세요.’ A 대립유전자가 있고 Iᴮ가 없는 조합을 찾으세요."
    ),

    P(
      "blood-02",
      "blood",
      "multiple-choice",
      "Iᴬ와 Iᴮ의 관계는?",
      [
        "공동우성",
        "Iᴬ만 우성",
        "Iᴮ만 우성",
        "둘 다 i에 대해 열성"
      ],
      0,
      "Iᴬ와 Iᴮ는 함께 있을 때 둘 다 표현되는 공동우성 관계입니다.",
      [
        "옳습니다.",
        "AB형에서는 둘 다 표현됩니다.",
        "AB형에서는 둘 다 표현됩니다.",
        "둘 다 i에 대해 우성입니다."
      ],
      "공동우성",
      "AB형에서 두 항원이 함께 표현됨을 떠올리세요."
    ),

    P(
      "blood-03",
      "blood",
      "punnett",
      "Iᴬi × Iᴮi에서 가능한 자녀의 유전자형으로 퍼넷 사각형을 완성하세요.",
      [],
      ["IᴬIᴮ", "Iᴬi", "Iᴮi", "ii"],
      "가능한 조합은 IᴬIᴮ, Iᴬi, Iᴮi, ii이며 각각 1/4입니다. 표현형도 AB형, A형, B형, O형이 각각 25%입니다.",
      [],
      "ABO 퍼넷 사각형",
      "각 부모가 만들 수 있는 두 생식세포를 먼저 확인하세요.",
      2,
      {
        parents: ["Iᴬi", "Iᴮi"],
        gametes: [
          ["Iᴬ", "i"],
          ["Iᴮ", "i"]
        ],
        genotypeRatio:
          "IᴬIᴮ·Iᴬi·Iᴮi·ii 각각 1/4(25%)",
        phenotypeRatio:
          "AB형·A형·B형·O형 각각 1/4(25%)"
      }
    ),

    P(
      "blood-04",
      "blood",
      "multiple-choice",
      "유전자형이 ii인 부모와 IᴬIᴮ인 부모 사이에서 가능한 자녀의 혈액형은?",
      [
        "A형 또는 B형",
        "AB형 또는 O형",
        "A형만",
        "네 혈액형 모두"
      ],
      0,
      "ii 부모는 i만, IᴬIᴮ 부모는 Iᴬ 또는 Iᴮ를 전달하므로 Iᴬi(A형) 또는 Iᴮi(B형)가 가능합니다.",
      [
        "옳습니다.",
        "이 조합에서는 불가능합니다.",
        "Iᴮi도 가능합니다.",
        "AB형과 O형은 불가능합니다."
      ],
      "ABO 조합",
      "각 부모가 전달할 수 있는 대립유전자를 한 개씩 적어 보세요."
    ),

    P(
      "blood-05",
      "blood",
      "true-false",
      "ABO 혈액형 자료만으로 실제 친자 관계를 확정할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "ABO 혈액형은 일부 조합의 가능성을 검토하는 데 쓰일 수 있지만 친자 관계를 확정하지 못합니다.",
      [
        "혈액형만으로 확정할 수 없습니다.",
        "옳습니다."
      ],
      "혈액형 모형의 한계",
      "가능한 조합을 따지는 것과 개인의 관계를 확정하는 것을 구분하세요."
    ),

    P(
      "sex-01",
      "sex",
      "multiple-choice",
      "학교 교육과정의 단순화된 모형에서 일반적인 XY 구성의 개인이 만드는 생식세포의 성염색체는?",
      [
        "X 또는 Y",
        "X만",
        "Y만",
        "XY 한 쌍"
      ],
      0,
      "감수분열 결과 각 생식세포는 X 또는 Y 중 하나를 가집니다.",
      [
        "옳습니다.",
        "Y를 가진 생식세포도 가능합니다.",
        "X를 가진 생식세포도 가능합니다.",
        "생식세포에는 한 개가 들어갑니다."
      ],
      "성염색체 분리",
      "생식세포는 염색체 쌍에서 하나를 받습니다."
    ),

    P(
      "sex-02",
      "sex",
      "multiple-choice",
      "X 염색체 연관 열성 모형에서 XᴺXⁿ인 가상 개인을 가장 적절히 설명한 것은?",
      [
        "보인자이며 보통 열성 형질은 나타나지 않는다.",
        "반드시 열성 형질이 나타난다.",
        "해당 대립유전자를 전달할 수 없다.",
        "Y 염색체에만 대립유전자가 있다."
      ],
      0,
      "완전 우성의 단순 모형에서 XᴺXⁿ은 보인자이며 Xⁿ을 자녀에게 전달할 수 있습니다.",
      [
        "옳습니다.",
        "Xᴺ이 있어 보통 열성 표현형은 나타나지 않습니다.",
        "Xⁿ을 전달할 수 있습니다.",
        "대립유전자는 X에 표시되어 있습니다."
      ],
      "보인자",
      "서로 다른 두 대립유전자를 가진 XX 조합을 살펴보세요."
    ),

    P(
      "sex-03",
      "sex",
      "multiple-choice",
      "XᴺXⁿ × XᴺY에서 태어날 수 없는 유전자형은?",
      [
        "XᴺXᴺ",
        "XᴺXⁿ",
        "XᴺY",
        "XⁿY",
        "XⁿXⁿ"
      ],
      4,
      "두 번째 부모는 Xᴺ 또는 Y만 전달하므로 XⁿXⁿ은 만들어질 수 없습니다.",
      [
        "가능합니다.",
        "가능합니다.",
        "가능합니다.",
        "가능합니다.",
        "옳습니다. 불가능합니다."
      ],
      "X 연관 퍼넷 분석",
      "각 부모의 생식세포를 Xᴺ·Xⁿ과 Xᴺ·Y로 나누세요."
    ),

    P(
      "sex-04",
      "sex",
      "multiple-select",
      "X 염색체 연관 열성 모형 XᴺXⁿ × XⁿY에서 가능한 자녀 유전자형을 모두 선택하세요.",
      [
        "XᴺXⁿ",
        "XⁿXⁿ",
        "XᴺY",
        "XⁿY",
        "YY"
      ],
      [0, 1, 2, 3],
      "가능한 조합은 XᴺXⁿ, XⁿXⁿ, XᴺY, XⁿY이며 YY는 만들어지지 않습니다.",
      [
        "가능합니다.",
        "가능합니다.",
        "가능합니다.",
        "가능합니다.",
        "한 부모가 반드시 X를 전달하므로 불가능합니다."
      ],
      "X 연관 유전",
      "‘해당하는 것을 모두 선택하세요.’ 첫 부모의 X 두 종류와 둘째 부모의 X 또는 Y를 조합하세요."
    ),

    P(
      "sex-05",
      "sex",
      "true-false",
      "성염색체 구성만 알면 한 개인의 모든 생물학적 특성을 완전히 설명할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "개인의 생물학적 특성에는 많은 유전자, 발달 과정, 호르몬, 환경 등이 관여합니다.",
      [
        "지나친 단순화입니다.",
        "옳습니다."
      ],
      "모형의 한계",
      "하나의 염색체 정보 외에 많은 요인이 관여하는지 생각하세요."
    ),

    P(
      "final-01",
      "final",
      "multiple-choice",
      "관찰되는 특성을 뜻하는 용어는?",
      [
        "표현형",
        "유전자형",
        "대립유전자",
        "염색체"
      ],
      0,
      "관찰되는 특성은 표현형이고, 대립유전자의 조합은 유전자형입니다.",
      [
        "옳습니다.",
        "유전적 조합입니다.",
        "유전자의 서로 다른 형태입니다.",
        "DNA가 포장된 구조입니다."
      ],
      "유전 용어",
      "‘관찰되는’이라는 단서에 주목하세요."
    ),

    P(
      "final-02",
      "final",
      "multiple-choice",
      "가상 가계도에서 형질이 나타나지 않은 두 부모에게 형질이 나타난 자녀가 있다. 단일 상염색체 모형에서 가장 잘 맞는 유전 양상은?",
      [
        "열성",
        "우성",
        "Y 연관이라고 확정",
        "자료만으로 어떤 모형도 고려 불가"
      ],
      0,
      "두 부모가 보인자 Aa이고 자녀가 aa인 상염색체 열성 모형으로 설명할 수 있습니다.",
      [
        "옳습니다.",
        "완전 침투의 단순 우성 모형과 맞지 않습니다.",
        "성별 정보 없이 확정할 수 없고 상염색체 열성으로 설명됩니다.",
        "열성 모형을 고려할 수 있습니다."
      ],
      "가계도 추론",
      "부모에게 보이지 않는 대립유전자가 자녀에게 두 개 모일 수 있는지 생각하세요.",
      2,
      {
        visual: "pedigree"
      }
    ),

    P(
      "final-03",
      "final",
      "multiple-select",
      "A가 a에 대해 완전 우성일 때, 우성 표현형 개인의 가능한 유전자형을 모두 선택하세요.",
      [
        "AA",
        "Aa",
        "aa"
      ],
      [0, 1],
      "우성 표현형은 AA와 Aa에서 나타납니다.",
      [
        "가능합니다.",
        "가능합니다.",
        "열성 표현형입니다."
      ],
      "가능한 유전자형",
      "‘해당하는 것을 모두 선택하세요.’ A가 하나만 있어도 표현되는지 확인하세요."
    ),

    P(
      "final-04",
      "final",
      "multiple-choice",
      "Iᴬi와 ii 부모 사이에서 자녀에게 가능한 혈액형은?",
      [
        "A형 또는 O형",
        "A형 또는 B형",
        "AB형 또는 O형",
        "AB형만"
      ],
      0,
      "첫 부모는 Iᴬ 또는 i, 둘째 부모는 i만 전달하므로 Iᴬi(A형) 또는 ii(O형)가 가능합니다.",
      [
        "옳습니다.",
        "Iᴮ가 없습니다.",
        "Iᴮ가 없어 AB형은 불가능합니다.",
        "AB형은 불가능합니다."
      ],
      "ABO 조합",
      "두 부모가 만들 수 있는 생식세포를 적어 보세요."
    ),

    P(
      "final-05",
      "final",
      "multiple-choice",
      "X 염색체 연관 열성 모형에서 XᴺXⁿ 부모와 XᴺY 부모 사이의 자녀 중 열성 형질이 나타날 수 있는 유전자형은?",
      [
        "XⁿY",
        "XᴺXᴺ",
        "XᴺXⁿ",
        "XᴺY"
      ],
      0,
      "가능한 조합 중 XⁿY는 X 염색체의 열성 대립유전자가 표현됩니다.",
      [
        "옳습니다.",
        "열성 대립유전자가 없습니다.",
        "단순 모형에서는 보인자입니다.",
        "열성 대립유전자가 없습니다."
      ],
      "X 연관 유전",
      "XY 조합에서는 X에 있는 대립유전자가 하나임을 떠올리세요."
    )
  ];

  const defaultState = () => ({
    version: SAVE_VERSION,
    currentRoom: "basic",
    player: {
      x: 12,
      y: 72
    },
    completedQuestions: [],
    attempts: {},
    hintUsed: {},
    keys: [],
    openedDoors: [],
    score: 0,
    bonuses: {
      rooms: [],
      final: false
    },
    firstTryStreak: 0,
    reviewNotes: [],
    progress: 0,
    settings: {
      soundEnabled: true
    },
    started: false,
    finished: false,
    correctFirstTry: 0
  });

  let state = defaultState();
  let currentQuestion = null;
  let activeModal = null;
  let previousFocus = null;
  let confirmAction = null;
  let reviewMode = false;

  const held = new Set();
  const dom = {};

  const hotspotPositions = [
    { x: 30, y: 12 },
    { x: 49, y: 25 },
    { x: 9, y: 50 },
    { x: 82, y: 29 },
    { x: 70, y: 68 }
  ];

  const obstacleRects = [
    { x: 25, y: 5, w: 45, h: 12 },
    { x: 42, y: 21, w: 16, h: 9 },
    { x: 4, y: 20, w: 10, h: 35 },
    { x: 84, y: 20, w: 12, h: 18 },
    { x: 22, y: 42, w: 13, h: 10 },
    { x: 44, y: 42, w: 13, h: 10 },
    { x: 66, y: 42, w: 13, h: 10 },
    { x: 22, y: 61, w: 13, h: 10 },
    { x: 44, y: 61, w: 13, h: 10 },
    { x: 66, y: 61, w: 13, h: 10 }
  ];

  const clamp = (number, minimum, maximum) =>
    Math.max(minimum, Math.min(maximum, number));

  const roomQuestions = room =>
    questions.filter(question => question.room === room);

  const completedInRoom = room =>
    roomQuestions(room).filter(question =>
      state.completedQuestions.includes(question.id)
    ).length;

  const keysInRoom = room =>
    state.keys.filter(key =>
      key.room === room && key.obtained
    ).length;

  const totalAttempts = () =>
    Object.values(state.attempts).reduce(
      (total, attempts) => total + attempts,
      0
    );

  const correctRate = () =>
    totalAttempts()
      ? Math.round(
          state.completedQuestions.length /
          totalAttempts() *
          100
        )
      : 0;

  function cacheDom() {
    [
      "startScreen",
      "gameScreen",
      "resultScreen",
      "startBtn",
      "continueBtn",
      "startSoundBtn",
      "soundBtn",
      "roomName",
      "scoreValue",
      "roomKeyLabel",
      "roomKeys",
      "totalKeys",
      "progressValue",
      "progressBar",
      "hintCount",
      "map",
      "hotspots",
      "door",
      "doorLabel",
      "player",
      "playerSprite",
      "interactionPrompt",
      "mobileInteract",
      "problemModal",
      "problemMeta",
      "problemTitle",
      "problemVisual",
      "answerForm",
      "answerArea",
      "hintBtn",
      "feedback",
      "conceptContent",
      "reviewList",
      "toast",
      "keyAnimation",
      "transition",
      "accessibleStatus",
      "confirmModal",
      "confirmText",
      "confirmOk",
      "confirmCancel",
      "resultGrade",
      "resultStats"
    ].forEach(id => {
      dom[id] = document.getElementById(id);
    });
  }

  // 저장값을 기본 상태와 병합한 뒤 핵심 자료형을 확인한다.
  function safeLoad() {
    const rawSave = localStorage.getItem(STORAGE_KEY);

    if (!rawSave) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawSave);

      if (!parsed || parsed.version !== SAVE_VERSION) {
        throw new Error("지원하지 않는 저장 데이터입니다.");
      }

      const base = defaultState();

      const merged = {
        ...base,
        ...parsed,
        player: {
          ...base.player,
          ...parsed.player
        },
        attempts: {
          ...base.attempts,
          ...parsed.attempts
        },
        hintUsed: {
          ...base.hintUsed,
          ...parsed.hintUsed
        },
        bonuses: {
          ...base.bonuses,
          ...parsed.bonuses
        },
        settings: {
          ...base.settings,
          ...parsed.settings
        }
      };

      const requiredArrays = [
        merged.completedQuestions,
        merged.keys,
        merged.openedDoors,
        merged.reviewNotes,
        merged.bonuses.rooms
      ];

      if (
        !ROOM_ORDER.includes(merged.currentRoom) ||
        !requiredArrays.every(Array.isArray) ||
        typeof merged.score !== "number"
      ) {
        throw new Error("저장 데이터 구조가 올바르지 않습니다.");
      }

      return merged;
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      setTimeout(() => {
        showToast(
          "저장 데이터가 손상되었거나 이전 버전이어서 안전하게 초기화했습니다."
        );
      }, 100);

      return null;
    }
  }

  function save() {
    state.progress = Math.round(
      state.completedQuestions.length /
      questions.length *
      100
    );

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

      return true;
    } catch {
      showToast(
        "저장 공간을 사용할 수 없어 현재 진행을 저장하지 못했습니다."
      );

      return false;
    }
  }

  function updateContinue() {
    dom.continueBtn.disabled =
      !localStorage.getItem(STORAGE_KEY);
  }

  function init() {
    cacheDom();

    const loadedState = safeLoad();

    if (loadedState) {
      state = loadedState;
    }

    bindEvents();
    configureSprite();
    setStartImage();
    updateContinue();
    updateSoundButtons();

    setInterval(() => {
      if (
        state.started &&
        !dom.gameScreen.classList.contains("hidden")
      ) {
        save();
      }
    }, 2000);

    requestAnimationFrame(gameLoop);
  }

  function bindEvents() {
    dom.startBtn.addEventListener("click", () => {
      sound("button");

      const hasSave =
        Boolean(localStorage.getItem(STORAGE_KEY));

      askConfirm(
        hasSave
          ? "새 게임을 시작하면 기존 진행 기록이 초기화됩니다. 시작할까요?"
          : "첫 번째 교실에서 활동을 시작할까요?",
        startNew
      );
    });

    dom.continueBtn.addEventListener("click", () => {
      sound("button");

      const loadedState = safeLoad();

      if (loadedState) {
        state = loadedState;
        showGame();
      }
    });

    document
      .querySelectorAll("[data-open]")
      .forEach(button => {
        button.addEventListener("click", () => {
          sound("button");

          openModal(
            document.getElementById(button.dataset.open)
          );
        });
      });

    document
      .querySelectorAll("[data-close]")
      .forEach(button => {
        button.addEventListener("click", closeModal);
      });

    document
      .getElementById("conceptBtn")
      .addEventListener("click", () => {
        closeModal();
        renderConcept();

        openModal(
          document.getElementById("conceptModal")
        );
      });

    document
      .getElementById("reviewBtn")
      .addEventListener("click", () => {
        closeModal();
        renderReview();

        openModal(
          document.getElementById("reviewModal")
        );
      });
    document
      .getElementById("saveBtn")
      .addEventListener("click", () => {
        save();
        showToast("진행 상황을 저장했습니다.");
      });

    document
      .getElementById("restartBtn")
      .addEventListener("click", () => {
        askConfirm(
          "모든 진행 기록을 지우고 처음부터 다시 시작할까요?",
          startNew
        );
      });

    document
      .getElementById("deleteBtn")
      .addEventListener("click", () => {
        askConfirm(
          "저장 기록을 삭제할까요? 삭제 후 복구할 수 없습니다.",
          deleteSave
        );
      });

    document
      .getElementById("homeBtn")
      .addEventListener("click", () => {
        closeModal();
        showStart();
      });

    document
      .getElementById("resultRestartBtn")
      .addEventListener("click", () => {
        askConfirm(
          "결과를 지우고 처음부터 다시 시작할까요?",
          startNew
        );
      });

    document
      .getElementById("resultReviewBtn")
      .addEventListener("click", () => {
        renderReview();

        openModal(
          document.getElementById("reviewModal")
        );
      });

    [
      dom.soundBtn,
      dom.startSoundBtn
    ].forEach(button => {
      button.addEventListener("click", toggleSound);
    });

    dom.answerForm.addEventListener(
      "submit",
      submitAnswer
    );

    dom.hintBtn.addEventListener(
      "click",
      showHint
    );

    dom.mobileInteract.addEventListener(
      "click",
      interact
    );

    dom.door.addEventListener(
      "click",
      interactDoor
    );

    dom.confirmCancel.addEventListener(
      "click",
      closeModal
    );

    dom.confirmOk.addEventListener("click", () => {
      const action = confirmAction;

      closeModal();

      if (action) {
        action();
      }
    });

    document.addEventListener(
      "keydown",
      keyDown
    );

    document.addEventListener("keyup", event => {
      held.delete(event.key.toLowerCase());
    });

    window.addEventListener("blur", () => {
      held.clear();
    });

    window.addEventListener("resize", () => {
      state.player.x = clamp(
        state.player.x,
        4,
        96
      );

      state.player.y = clamp(
        state.player.y,
        5,
        94
      );

      renderPlayer();
    });

    document
      .querySelectorAll("[data-direction]")
      .forEach(button => {
        const direction =
          button.dataset.direction;

        [
          "pointerdown",
          "touchstart"
        ].forEach(eventName => {
          button.addEventListener(
            eventName,
            event => {
              event.preventDefault();
              held.add(direction);
            },
            {
              passive: false
            }
          );
        });

        [
          "pointerup",
          "pointercancel",
          "pointerleave",
          "touchend"
        ].forEach(eventName => {
          button.addEventListener(
            eventName,
            () => {
              held.delete(direction);
            }
          );
        });
      });

    document
      .querySelectorAll(".modal")
      .forEach(modal => {
        modal.addEventListener(
          "mousedown",
          event => {
            if (
              event.target === modal &&
              modal.id !== "confirmModal"
            ) {
              closeModal();
            }
          }
        );
      });

    window.addEventListener(
      "beforeunload",
      () => {
        if (state.started) {
          save();
        }
      }
    );
  }

  function keyDown(event) {
    const key = event.key.toLowerCase();

    if (activeModal) {
      if (
        event.key === "Escape" &&
        activeModal.id !== "confirmModal"
      ) {
        closeModal();
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }

      return;
    }

    if (
      !dom.gameScreen.classList.contains(
        "hidden"
      )
    ) {
      const controlledKeys = [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "w",
        "a",
        "s",
        "d",
        "enter",
        " "
      ];

      if (controlledKeys.includes(key)) {
        event.preventDefault();
      }

      if (
        key === "enter" ||
        key === " "
      ) {
        interact();
      } else {
        held.add(key);
      }
    }
  }

  function trapFocus(event) {
    const focusableElements = [
      ...activeModal.querySelectorAll(
        "button, input, select, " +
        "[tabindex]:not([tabindex='-1'])"
      )
    ].filter(element => !element.disabled);

    if (!focusableElements.length) {
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function openModal(modal) {
    if (!modal) {
      return;
    }

    previousFocus = document.activeElement;
    activeModal = modal;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    held.clear();

    setTimeout(() => {
      const firstFocusable =
        modal.querySelector(
          "button, input, select"
        );

      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 0);
  }

  function closeModal() {
    if (!activeModal) {
      return;
    }

    activeModal.classList.add("hidden");
    activeModal = null;

    document.body.style.overflow = "";

    currentQuestion = null;
    reviewMode = false;

    if (
      previousFocus &&
      document.contains(previousFocus)
    ) {
      previousFocus.focus();
    }
  }

  function askConfirm(text, action) {
    confirmAction = action;
    dom.confirmText.textContent = text;

    openModal(dom.confirmModal);
  }

  function startNew() {
    state = defaultState();
    state.started = true;

    save();
    showGame();

    showToast(
      "학교에서 진행되는 유전 학습 방탈출 활동이 시작되었습니다. " +
      "교실에 숨겨진 유전 문제를 해결하면 문을 열 수 있는 열쇠를 얻습니다. " +
      "모든 교실을 통과해 학교 밖으로 나가세요."
    );
  }

  function deleteSave() {
    localStorage.removeItem(STORAGE_KEY);

    state = defaultState();

    updateContinue();
    showStart();
    showToast("저장 기록을 삭제했습니다.");
  }

  function showStart() {
    dom.startScreen.classList.remove(
      "hidden"
    );

    dom.gameScreen.classList.add(
      "hidden"
    );

    dom.resultScreen.classList.add(
      "hidden"
    );

    updateContinue();
  }

  function showGame() {
    dom.startScreen.classList.add(
      "hidden"
    );

    dom.gameScreen.classList.remove(
      "hidden"
    );

    dom.resultScreen.classList.add(
      "hidden"
    );

    renderRoom();
  }

  function renderRoom() {
    const room = rooms[state.currentRoom];

    dom.roomName.textContent = room.name;

    dom.roomKeyLabel.textContent =
      `${ROOM_ORDER.indexOf(
        state.currentRoom
      ) + 1}교실 ${room.keyName}`;

    dom.doorLabel.textContent =
      state.currentRoom === "final"
        ? "학교 출구"
        : "다음 교실";

    dom.map.className =
      `game-map room-${state.currentRoom}`;

    setRoomImage(room.image);
    renderHotspots();
    renderPlayer();
    updateHud();
    updateDoor();
    renderConcept();
  }

  function setStartImage() {
    const image = new Image();

    image.onload = () => {
      dom.startScreen.style.backgroundImage =
        "linear-gradient(" +
        "rgba(223,246,252,.25)," +
        "rgba(241,223,173,.35)" +
        '),url("assets/school-entrance.png")';

      dom.startScreen.style.backgroundSize =
        "cover";

      dom.startScreen.style.backgroundPosition =
        "center";
    };

    image.onerror = () => {
      dom.startScreen.style.backgroundImage =
        "";
    };

    image.src =
      "assets/school-entrance.png";
  }

  function setRoomImage(fileName) {
    const image = new Image();

    image.onload = () => {
      dom.map.style.backgroundImage =
        `url("assets/${fileName}")`;

      dom.map.classList.add("has-image");
    };

    image.onerror = () => {
      dom.map.style.backgroundImage = "";
      dom.map.classList.remove("has-image");
    };

    image.src = `assets/${fileName}`;
  }

  function configureSprite() {
    const spriteReady = () => {
      dom.player.style.backgroundImage =
        'url("assets/bichon-sprite.png")';

      dom.player.classList.add(
        "sprite-ready"
      );
    };

    const spriteFailed = () => {
      dom.player.style.backgroundImage = "";

      dom.player.classList.remove(
        "sprite-ready"
      );
    };

    dom.playerSprite.addEventListener(
      "load",
      spriteReady
    );

    dom.playerSprite.addEventListener(
      "error",
      spriteFailed
    );

    if (
      dom.playerSprite.complete &&
      dom.playerSprite.naturalWidth
    ) {
      spriteReady();
    }
  }

  function renderHotspots() {
    dom.hotspots.replaceChildren();

    roomQuestions(state.currentRoom)
      .forEach((question, index) => {
        const button =
          document.createElement("button");

        const completed =
          state.completedQuestions.includes(
            question.id
          );

        button.className =
          "hotspot" +
          (completed ? " completed" : "");

        button.style.left =
          `${hotspotPositions[index].x}%`;

        button.style.top =
          `${hotspotPositions[index].y}%`;

        button.dataset.questionId =
          question.id;

        button.setAttribute(
          "aria-label",
          `${index + 1}번 조사 지점` +
          (completed ? ", 해결 완료" : "")
        );

        button.addEventListener(
          "click",
          () => {
            openQuestion(question);
          }
        );

        dom.hotspots.appendChild(button);
      });
  }

  function renderPlayer() {
    dom.player.style.left =
      `${state.player.x}%`;

    dom.player.style.top =
      `${state.player.y}%`;
  }

  function gameLoop() {
    if (
      !activeModal &&
      !dom.gameScreen.classList.contains(
        "hidden"
      )
    ) {
      let horizontal = 0;
      let vertical = 0;

      if (
        held.has("arrowleft") ||
        held.has("a") ||
        held.has("left")
      ) {
        horizontal -= 1;
      }

      if (
        held.has("arrowright") ||
        held.has("d") ||
        held.has("right")
      ) {
        horizontal += 1;
      }

      if (
        held.has("arrowup") ||
        held.has("w") ||
        held.has("up")
      ) {
        vertical -= 1;
      }

      if (
        held.has("arrowdown") ||
        held.has("s") ||
        held.has("down")
      ) {
        vertical += 1;
      }

      if (horizontal || vertical) {
        movePlayer(horizontal, vertical);
      } else {
        dom.player.classList.remove(
          "walking"
        );
      }

      updateInteraction();
    }

    requestAnimationFrame(gameLoop);
  }

  function movePlayer(horizontal, vertical) {
    const length =
      Math.hypot(horizontal, vertical) || 1;

    const speed = 0.12;

    const nextX = clamp(
      state.player.x +
      horizontal / length * speed,
      3,
      97
    );

    const nextY = clamp(
      state.player.y +
      vertical / length * speed,
      4,
      96
    );

    if (!collides(nextX, nextY)) {
      state.player.x = nextX;
      state.player.y = nextY;

      renderPlayer();
    }

    dom.player.classList.add("walking");

    dom.player.classList.remove(
      "facing-up",
      "facing-down",
      "facing-left",
      "facing-right"
    );

    const facingClass =
      Math.abs(horizontal) >
      Math.abs(vertical)
        ? horizontal < 0
          ? "facing-left"
          : "facing-right"
        : vertical < 0
          ? "facing-up"
          : "facing-down";

    dom.player.classList.add(facingClass);
  }

  function collides(x, y) {
    const playerRadius = 2.6;

    return obstacleRects.some(obstacle =>
      x + playerRadius > obstacle.x &&
      x - playerRadius <
        obstacle.x + obstacle.w &&
      y + playerRadius > obstacle.y &&
      y - playerRadius <
        obstacle.y + obstacle.h
    );
  }

  function nearestTarget() {
    let nearest = null;
    let nearestDistance = 999;

    roomQuestions(state.currentRoom)
      .forEach((question, index) => {
        const position =
          hotspotPositions[index];

        const distance = Math.hypot(
          state.player.x - position.x,
          state.player.y - position.y
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;

          nearest = {
            type: "question",
            question
          };
        }
      });

    const doorDistance = Math.hypot(
      state.player.x - 94,
      state.player.y - 80
    );

    if (doorDistance < nearestDistance) {
      nearestDistance = doorDistance;

      nearest = {
        type: "door"
      };
    }

    return nearestDistance < 12
      ? nearest
      : null;
  }

  function updateInteraction() {
    const target = nearestTarget();

    if (!target) {
      dom.interactionPrompt.classList.add(
        "hidden"
      );

      return;
    }

    if (target.type === "question") {
      const completed =
        state.completedQuestions.includes(
          target.question.id
        );

      dom.interactionPrompt.textContent =
        completed
          ? "Enter 키로 완료 장소 확인"
          : "Enter 키로 문제 풀기";
    } else {
      dom.interactionPrompt.textContent =
        "Enter 키로 문 조사";
    }

    dom.interactionPrompt.classList.remove(
      "hidden"
    );
  }

  function interact() {
    const target = nearestTarget();

    if (!target) {
      showToast(
        "빛나는 조사 지점이나 문 가까이에서 조사하세요."
      );

      return;
    }

    if (target.type === "question") {
      openQuestion(target.question);
    } else {
      interactDoor();
    }
  }

  function openQuestion(
    question,
    fromReview = false
  ) {
    sound("open");

    if (
      state.completedQuestions.includes(
        question.id
      ) &&
      !fromReview
    ) {
      showToast(
        "이곳의 문제는 이미 해결했습니다."
      );

      return;
    }

    currentQuestion = question;
    reviewMode = fromReview;

    dom.problemMeta.textContent =
      `${rooms[question.room].name} · ` +
      `난이도 ${question.difficulty}`;

    dom.problemTitle.textContent =
      question.question;

    dom.feedback.className =
      "feedback hidden";

    dom.feedback.replaceChildren();

    renderVisual(question);
    renderAnswer(question);

    dom.answerForm.querySelector(
      "button[type='submit']"
    ).disabled = false;

    dom.hintBtn.disabled =
      Boolean(state.hintUsed[question.id]);

    openModal(dom.problemModal);
  }

  function renderVisual(question) {
    dom.problemVisual.replaceChildren();

    if (question.visual === "pedigree") {
      dom.problemVisual.innerHTML =
        pedigreeHtml();
    } else if (question.type === "punnett") {
      dom.problemVisual.innerHTML =
        punnettHtml(question);
    }
  }

  function pedigreeHtml() {
    return `
      <div
        class="pedigree"
        aria-label="가상 가계도"
      >
        <div class="legend">
          <span>
            <i class="shape"></i>
            남성
          </span>

          <span>
            <i class="shape circle"></i>
            여성
          </span>

          <span>채움: 형질 나타남</span>
        </div>

        <svg
          viewBox="0 0 420 190"
          role="img"
          aria-label="I세대 두 부모와 II세대 세 자녀 중 II-2에게 형질이 나타난 가상 가계도"
        >
          <text x="10" y="55">I</text>

          <rect
            x="100"
            y="25"
            width="42"
            height="42"
            fill="white"
            stroke="#172435"
            stroke-width="4"
          />

          <circle
            cx="285"
            cy="46"
            r="21"
            fill="white"
            stroke="#172435"
            stroke-width="4"
          />

          <line
            x1="142"
            y1="46"
            x2="264"
            y2="46"
            stroke="#172435"
            stroke-width="4"
          />

          <line
            x1="203"
            y1="46"
            x2="203"
            y2="95"
            stroke="#172435"
            stroke-width="4"
          />

          <line
            x1="105"
            y1="95"
            x2="305"
            y2="95"
            stroke="#172435"
            stroke-width="4"
          />

          <text x="10" y="150">II</text>

          <line
            x1="105"
            y1="95"
            x2="105"
            y2="120"
            stroke="#172435"
            stroke-width="4"
          />

          <circle
            cx="105"
            cy="143"
            r="21"
            fill="white"
            stroke="#172435"
            stroke-width="4"
          />

          <line
            x1="205"
            y1="95"
            x2="205"
            y2="120"
            stroke="#172435"
            stroke-width="4"
          />

          <rect
            x="184"
            y="122"
            width="42"
            height="42"
            fill="#172435"
          />

          <line
            x1="305"
            y1="95"
            x2="305"
            y2="120"
            stroke="#172435"
            stroke-width="4"
          />

          <circle
            cx="305"
            cy="143"
            r="21"
            fill="white"
            stroke="#172435"
            stroke-width="4"
          />

          <text x="100" y="184">1</text>
          <text x="200" y="184">2</text>
          <text x="300" y="184">3</text>
        </svg>
      </div>
    `;
  }

  function punnettHtml(question) {
    const options = [
      ...new Set(question.answer)
    ]
      .sort()
      .map(value =>
        `<option value="${value}">` +
        `${value}</option>`
      )
      .join("");

    const rows = question.gametes[1]
      .map((gamete, rowIndex) => {
        const cells = [0, 1]
          .map((unused, columnIndex) => `
            <td>
              <label
                class="sr-only"
                for="cell-${rowIndex}-${columnIndex}"
              >
                ${rowIndex + 1}행
                ${columnIndex + 1}열
              </label>

              <select
                id="cell-${rowIndex}-${columnIndex}"
                data-punnett
              >
                <option value="">선택</option>
                ${options}
              </select>
            </td>
          `)
          .join("");

        return `
          <tr>
            <th>${gamete}</th>
            ${cells}
          </tr>
        `;
      })
      .join("");

    return `
      <div class="notice">
        부모:
        ${question.parents[0]} ×
        ${question.parents[1]}
      </div>

      <div class="punnett-wrap">
        <table class="punnett">
          <caption>퍼넷 사각형</caption>

          <tr>
            <th>생식세포</th>
            <th>${question.gametes[0][0]}</th>
            <th>${question.gametes[0][1]}</th>
          </tr>

          ${rows}
        </table>
      </div>
    `;
  }

  function renderAnswer(question) {
    dom.answerArea.replaceChildren();

    if (question.type === "punnett") {
      return;
    }

    const multiple =
      question.type === "multiple-select";

    if (multiple) {
      const instruction =
        document.createElement("p");

      instruction.textContent =
        "해당하는 것을 모두 선택하세요.";

      instruction.className = "notice";

      dom.answerArea.appendChild(
        instruction
      );
    }

    const choiceList =
      document.createElement("div");

    choiceList.className = "choice-list";

    question.choices.forEach(
      (choice, index) => {
        const label =
          document.createElement("label");

        label.className = "choice";

        const input =
          document.createElement("input");

        input.type =
          multiple ? "checkbox" : "radio";

        input.name = "answer";
        input.value = String(index);

        label.append(
          input,
          document.createTextNode(choice)
        );

        choiceList.appendChild(label);
      }
    );

    dom.answerArea.appendChild(choiceList);
  }

  function readAnswer(question) {
    if (question.type === "punnett") {
      return [
        ...dom.problemVisual.querySelectorAll(
          "[data-punnett]"
        )
      ].map(select => select.value);
    }

    const selectedValues = [
      ...dom.answerArea.querySelectorAll(
        "input:checked"
      )
    ].map(input => Number(input.value));

    if (
      question.type === "multiple-select"
    ) {
      return selectedValues;
    }

    return selectedValues.length
      ? selectedValues[0]
      : null;
  }

  function normalized(value) {
    if (Array.isArray(value)) {
      return [...value]
        .map(String)
        .sort()
        .join("|");
    }

    return String(value);
  }

  function isCorrect(question, value) {
    return (
      normalized(value) ===
      normalized(question.answer)
    );
  }

  function answerText(question, value) {
    if (question.type === "punnett") {
      return Array.isArray(value)
        ? value.join(", ")
        : String(value);
    }

    if (Array.isArray(value)) {
      return value
        .map(index =>
          question.choices[index]
        )
        .join(", ");
    }

    return (
      question.choices[value] ??
      "선택 없음"
    );
  }

  function submitAnswer(event) {
    event.preventDefault();

    if (!currentQuestion) {
      return;
    }

    const question = currentQuestion;
    const value = readAnswer(question);

    const hasEmptyPunnettCell =
      Array.isArray(value) &&
      value.some(item => item === "");

    const hasNoSelection =
      Array.isArray(value) &&
      value.length === 0;

    if (
      value === null ||
      hasEmptyPunnettCell ||
      hasNoSelection
    ) {
      showToast(
        "답을 선택하거나 모든 칸을 완성하세요."
      );

      return;
    }

    state.attempts[question.id] =
      (state.attempts[question.id] || 0) + 1;

    if (isCorrect(question, value)) {
      handleCorrect(question, value);
    } else {
      handleWrong(question, value);
    }

    save();
    updateHud();
  }

  function calculateQuestionScore(question) {
    const attempts =
      state.attempts[question.id] || 1;

    let points =
      attempts === 1
        ? 100
        : attempts === 2
          ? 70
          : 40;

    if (state.hintUsed[question.id]) {
      points -= 20;
    }

    return Math.max(0, points);
  }

  // 점수 계산, 고유 열쇠 저장, 완료 저장,
  // 화면 갱신 순서로 처리한다.
  function handleCorrect(question, value) {
    sound("correct");

    if (question.type === "punnett") {
      dom.problemVisual
        .querySelectorAll("select")
        .forEach(select => {
          select.style.background =
            "#e7f7ee";
        });
    }

    const firstCompletion =
      !state.completedQuestions.includes(
        question.id
      );

    let earned = 0;
    let streakBonus = 0;
    let roomBonus = 0;

    if (firstCompletion) {
      earned =
        calculateQuestionScore(question);

      state.score += earned;

      if (
        state.attempts[question.id] === 1 &&
        !state.hintUsed[question.id]
      ) {
        state.firstTryStreak += 1;
        state.correctFirstTry += 1;

        if (
          state.firstTryStreak % 3 === 0
        ) {
          streakBonus = 50;
          state.score += streakBonus;
        }
      } else {
        state.firstTryStreak = 0;
      }

      state.completedQuestions = [
        ...state.completedQuestions,
        question.id
      ];

      const key = {
        id: question.keyId,
        room: question.room,
        questionId: question.id,
        label:
          `${rooms[question.room].name} ` +
          `열쇠 ${keysInRoom(
            question.room
          ) + 1}`,
        color: rooms[question.room].color,
        obtained: true,
        used: false
      };

      if (
        !state.keys.some(
          savedKey =>
            savedKey.id === key.id
        )
      ) {
        state.keys = [
          ...state.keys,
          key
        ];
      }

      if (
        completedInRoom(question.room) === 5 &&
        !state.bonuses.rooms.includes(
          question.room
        )
      ) {
        roomBonus = 200;
        state.score += roomBonus;

        state.bonuses.rooms = [
          ...state.bonuses.rooms,
          question.room
        ];
      }

      state.reviewNotes =
        state.reviewNotes.map(note =>
          note.questionId === question.id
            ? {
                ...note,
                reviewCompleted: true
              }
            : note
        );

      save();
      updateHud();
      renderHotspots();
      updateDoor();
      animateKey();
    }

    const punnettExplanation =
      question.type === "punnett"
        ? `
          <p>
            <strong>유전자형 비율:</strong>
            ${question.genotypeRatio}
          </p>

          <p>
            <strong>표현형 비율:</strong>
            ${question.phenotypeRatio}
          </p>

          <p class="notice">
            이 확률은 각 출생에서 가능한
            결과를 뜻하며, 적은 수의 실제
            자녀에게 반드시 정확한 비율로
            나타나는 것은 아닙니다.
          </p>
        `
        : "";

    const rewardMessage =
      firstCompletion
        ? `
          <p>
            <strong>
              문을 열 수 있는
              ${rooms[question.room].keyName}를
              얻었습니다.
            </strong>

            +${earned}점

            ${
              streakBonus
                ? ` · 연속 정답 +${streakBonus}점`
                : ""
            }

            ${
              roomBonus
                ? ` · 교실 완료 +${roomBonus}점`
                : ""
            }
          </p>
        `
        : `
          <p>
            복습 완료! 점수와 열쇠는
            중복 지급되지 않습니다.
          </p>
        `;

    dom.feedback.className =
      "feedback correct";

    dom.feedback.innerHTML = `
      <h3>✓ 정답입니다!</h3>

      <p>
        <strong>정답:</strong>
        ${answerText(
          question,
          question.answer
        )}
      </p>

      <p>${question.explanation}</p>

      <p>
        <strong>관련 개념:</strong>
        ${question.concept}
      </p>

      ${punnettExplanation}
      ${rewardMessage}

      <div class="button-row">
        <button
          type="button"
          data-feedback-close
        >
          확인
        </button>
      </div>
    `;

    dom.feedback
      .querySelector(
        "[data-feedback-close]"
      )
      .addEventListener(
        "click",
        closeModal
      );

    dom.answerForm.querySelector(
      "button[type='submit']"
    ).disabled = true;
  }

  function handleWrong(question, value) {
    sound("wrong");

    state.firstTryStreak = 0;

    const attempts =
      state.attempts[question.id];

    let reason =
      "선택한 답이 문제의 조건과 맞지 않습니다.";

    if (question.type !== "punnett") {
      if (Array.isArray(value)) {
        reason = value
          .map(index =>
            question.wrongExplanations[index]
          )
          .filter(Boolean)
          .join(" ");
      } else {
        reason =
          question.wrongExplanations[value] ||
          reason;
      }
    } else {
      dom.problemVisual
        .querySelectorAll("select")
        .forEach((select, index) => {
          const correct =
            select.value ===
            question.answer[index];

          select.style.background =
            correct
              ? "#e7f7ee"
              : "#fdebec";

          select.title = correct
            ? "올바른 조합"
            : "위와 왼쪽의 대립유전자를 하나씩 합쳐 수정하세요.";
        });

      reason =
        "표시된 칸 중 일부는 위쪽과 " +
        "왼쪽 대립유전자의 조합이 아닙니다.";
    }

    const note = {
      questionId: question.id,
      userAnswer:
        answerText(question, value),
      correctAnswer:
        answerText(
          question,
          question.answer
        ),
      reason,
      explanation: question.explanation,
      concept: question.concept,
      reviewCompleted: false
    };

    const noteIndex =
      state.reviewNotes.findIndex(
        savedNote =>
          savedNote.questionId ===
          question.id
      );

    if (noteIndex < 0) {
      state.reviewNotes = [
        ...state.reviewNotes,
        note
      ];
    } else {
      state.reviewNotes =
        state.reviewNotes.map(
          (savedNote, index) =>
            index === noteIndex
              ? {
                  ...savedNote,
                  ...note
                }
              : savedNote
        );
    }

    const learningMessage =
      attempts >= 3
        ? `
          <strong>자세한 해설:</strong>
          ${question.explanation}
        `
        : `
          <strong>다시 생각하기:</strong>
          ${question.concept}의 조건을
          하나씩 확인하세요.
        `;

    dom.feedback.className =
      "feedback wrong";

    dom.feedback.innerHTML = `
      <h3>
        ✕ 아직 열쇠를 얻지 못했습니다.
      </h3>

      <p>${reason}</p>

      <p>${learningMessage}</p>

      <div class="button-row">
        <button
          type="button"
          data-retry
        >
          다시 시도하기
        </button>

        <button
          type="button"
          data-inline-hint
          ${
            state.hintUsed[question.id]
              ? "disabled"
              : ""
          }
        >
          힌트 보기
        </button>
      </div>
    `;

    dom.feedback
      .querySelector("[data-retry]")
      .addEventListener("click", () => {
        dom.feedback.className =
          "feedback hidden";

        dom.answerForm.querySelector(
          "button[type='submit']"
        ).disabled = false;
      });

    dom.feedback
      .querySelector(
        "[data-inline-hint]"
      )
      .addEventListener(
        "click",
        showHint
      );
  }

  function showHint() {
    if (
      !currentQuestion ||
      state.hintUsed[currentQuestion.id]
    ) {
      return;
    }

    state.hintUsed[currentQuestion.id] =
      true;

    save();

    dom.hintBtn.disabled = true;

    showToast(
      `힌트: ${currentQuestion.hint}`
    );

    updateHud();
  }

  function animateKey() {
    sound("key");

    dom.keyAnimation.classList.remove(
      "hidden"
    );

    setTimeout(() => {
      dom.keyAnimation.classList.add(
        "hidden"
      );
    }, 950);
  }

  function updateDoor() {
    const ready =
      completedInRoom(state.currentRoom) === 5 &&
      keysInRoom(state.currentRoom) === 5;

    const opened =
      state.openedDoors.includes(
        state.currentRoom
      );

    dom.door.className =
      `door ${
        opened
          ? "open"
          : ready
            ? "available"
            : "locked"
      }`;

    dom.door.querySelector(
      ".lock"
    ).textContent =
      opened
        ? "✓"
        : ready
          ? "🔓"
          : "🔒";

    dom.door.setAttribute(
      "aria-label",
      opened
        ? "열린 출입문"
        : ready
          ? "열 수 있는 출입문"
          : "잠긴 출입문"
    );
  }

  function interactDoor() {
    const room = state.currentRoom;
    const keyCount = keysInRoom(room);

    if (
      keyCount < 5 ||
      completedInRoom(room) < 5
    ) {
      showToast(
        "문을 열려면 열쇠가 더 필요합니다. " +
        "교실에 남아 있는 유전 문제를 찾아보세요. " +
        `${rooms[room].keyName} ${keyCount}/5개`
      );

      return;
    }

    openDoor(room);
  }

  function openDoor(room) {
    held.clear();
    sound("unlock");

    state.keys = state.keys.map(key =>
      key.room === room
        ? {
            ...key,
            used: true
          }
        : key
    );

    if (
      !state.openedDoors.includes(room)
    ) {
      state.openedDoors = [
        ...state.openedDoors,
        room
      ];
    }

    save();
    updateDoor();

    dom.door.classList.add("open");

    setTimeout(() => {
      sound("door");
      transition();

      const currentIndex =
        ROOM_ORDER.indexOf(room);

      if (
        currentIndex ===
        ROOM_ORDER.length - 1
      ) {
        finishGame();
      } else {
        state.currentRoom =
          ROOM_ORDER[currentIndex + 1];

        state.player = {
          x: 12,
          y: 72
        };

        save();

        setTimeout(
          renderRoom,
          420
        );
      }
    }, 700);
  }

  function transition() {
    dom.transition.classList.remove(
      "hidden"
    );

    setTimeout(() => {
      dom.transition.classList.add(
        "hidden"
      );
    }, 950);
  }

  function finishGame() {
    if (!state.bonuses.final) {
      state.score += 500;
      state.bonuses.final = true;
    }

    state.finished = true;

    save();
    sound("finish");

    setTimeout(
      showResults,
      500
    );
  }

  function showResults() {
    dom.gameScreen.classList.add(
      "hidden"
    );

    dom.startScreen.classList.add(
      "hidden"
    );

    dom.resultScreen.classList.remove(
      "hidden"
    );

    const rate = correctRate();

    if (rate >= 90) {
      dom.resultGrade.textContent =
        "완벽한 탈출";
    } else if (rate >= 80) {
      dom.resultGrade.textContent =
        "뛰어난 탈출";
    } else if (rate >= 70) {
      dom.resultGrade.textContent =
        "성공적인 탈출";
    } else {
      dom.resultGrade.textContent =
        "탈출 성공—복습 권장";
    }

    const roomRates =
      ROOM_ORDER.map(room => {
        const roomQuestionList =
          roomQuestions(room);

        const attempts =
          roomQuestionList.reduce(
            (total, question) =>
              total +
              (state.attempts[
                question.id
              ] || 0),
            0
          );

        return {
          room,
          rate: attempts
            ? Math.round(
                roomQuestionList.length /
                attempts *
                100
              )
            : 0
        };
      });

    const bestRoom = [
      ...roomRates
    ].sort(
      (first, second) =>
        second.rate - first.rate
    )[0];

    const reviewRoom = [
      ...roomRates
    ].sort(
      (first, second) =>
        first.rate - second.rate
    )[0];

    dom.resultStats.innerHTML = `
      <div class="stat-card">
        <strong>최종 점수</strong>
        <br>
        ${state.score}점
      </div>

      <div class="stat-card">
        <strong>전체 정답률</strong>
        <br>
        ${rate}%
      </div>

      <div class="stat-card">
        <strong>획득 열쇠</strong>
        <br>
        ${state.keys.length}/25개
      </div>

      <div class="stat-card">
        <strong>힌트 사용</strong>
        <br>
        ${
          Object.values(
            state.hintUsed
          ).filter(Boolean).length
        }회
      </div>

      <div class="stat-card">
        <strong>가장 높은 단원</strong>
        <br>
        ${rooms[bestRoom.room].name}
        ${bestRoom.rate}%
      </div>

      <div class="stat-card">
        <strong>추가 복습 단원</strong>
        <br>
        ${rooms[reviewRoom.room].name}
        ${reviewRoom.rate}%
      </div>

      ${roomRates
        .map(result => `
          <div class="stat-card">
            <strong>
              ${rooms[result.room].name}
            </strong>
            <br>
            정답률 ${result.rate}%
          </div>
        `)
        .join("")}
    `;
  }

  function updateHud() {
    const room = state.currentRoom;

    const progress = Math.round(
      state.completedQuestions.length /
      questions.length *
      100
    );

    const usedHintCount =
      Object.values(
        state.hintUsed
      ).filter(Boolean).length;

    dom.scoreValue.textContent =
      state.score;

    dom.roomKeys.textContent =
      `🔑 ${keysInRoom(room)}/5`;

    dom.totalKeys.textContent =
      `🔑 ${state.keys.length}/25`;

    dom.progressValue.textContent =
      `${progress}%`;

    dom.progressBar.style.width =
      `${progress}%`;

    dom.hintCount.textContent =
      `${usedHintCount}회`;
  }

  function renderConcept() {
    const room = rooms[state.currentRoom];

    const conceptCards =
      room.concepts
        .map(
          (concept, index) => `
            <article class="concept-item">
              <strong>${index + 1}</strong>
              <p>${concept}</p>
            </article>
          `
        )
        .join("");

    dom.conceptContent.innerHTML = `
      <p class="notice">
        문제를 풀기 전에 핵심 개념을
        확인하세요.
      </p>

      <div class="concept-grid">
        ${conceptCards}
      </div>
    `;
  }

  function renderReview() {
    if (!state.reviewNotes.length) {
      dom.reviewList.innerHTML = `
        <p>
          아직 복습할 문제가 없습니다.
          틀린 문제가 생기면 자동으로
          저장됩니다.
        </p>
      `;

      return;
    }

    dom.reviewList.innerHTML =
      state.reviewNotes
        .map(note => {
          const question =
            questions.find(
              item =>
                item.id === note.questionId
            );

          return `
            <article
              class="review-item ${
                note.reviewCompleted
                  ? "done"
                  : ""
              }"
            >
              <h3>
                ${
                  note.reviewCompleted
                    ? "✓ 복습 완료"
                    : "복습 필요"
                }
                · ${question.question}
              </h3>

              <p>
                <strong>선택한 답:</strong>
                ${note.userAnswer}
              </p>

              <p>
                <strong>정답:</strong>
                ${note.correctAnswer}
              </p>

              <p>
                <strong>오답 이유:</strong>
                ${note.reason}
              </p>

              <p>
                <strong>풀이:</strong>
                ${note.explanation}
              </p>

              <p>
                <strong>개념:</strong>
                ${note.concept}
              </p>

              <button
                data-review="${question.id}"
              >
                다시 풀기
              </button>
            </article>
          `;
        })
        .join("");

    dom.reviewList
      .querySelectorAll("[data-review]")
      .forEach(button => {
        button.addEventListener(
          "click",
          () => {
            const question =
              questions.find(
                item =>
                  item.id ===
                  button.dataset.review
              );

            closeModal();
            openQuestion(question, true);
          }
        );
      });
  }

  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);

    dom.toast.textContent = message;
    dom.accessibleStatus.textContent =
      message;

    dom.toast.classList.remove("hidden");

    toastTimer = setTimeout(() => {
      dom.toast.classList.add("hidden");
    }, 3500);
  }

  let audioContext = null;

  function ensureAudio() {
    if (!state.settings.soundEnabled) {
      return null;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

      audioContext =
        audioContext ||
        new AudioContextClass();

      if (
        audioContext.state === "suspended"
      ) {
        audioContext.resume();
      }

      return audioContext;
    } catch {
      return null;
    }
  }

  function sound(type) {
    const context = ensureAudio();

    if (!context) {
      return;
    }

    const tones = {
      button: [330, 0.04],
      open: [440, 0.06],
      correct: [660, 0.14],
      wrong: [180, 0.12],
      key: [880, 0.2],
      unlock: [520, 0.25],
      door: [260, 0.22],
      finish: [784, 0.4]
    };

    const selectedTone =
      tones[type] || tones.button;

    const frequency = selectedTone[0];
    const duration = selectedTone[1];

    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      frequency,
      context.currentTime
    );

    gain.gain.setValueAtTime(
      0.025,
      context.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + duration
    );

    oscillator
      .connect(gain)
      .connect(context.destination);

    oscillator.start();

    oscillator.stop(
      context.currentTime + duration
    );
  }

  function toggleSound() {
    state.settings.soundEnabled =
      !state.settings.soundEnabled;

    save();
    updateSoundButtons();

    if (state.settings.soundEnabled) {
      sound("button");
    }
  }

  function updateSoundButtons() {
    const soundEnabled =
      state.settings.soundEnabled;

    dom.soundBtn.textContent =
      soundEnabled ? "🔊" : "🔇";

    dom.soundBtn.setAttribute(
      "aria-label",
      soundEnabled
        ? "소리 끄기"
        : "소리 켜기"
    );

    dom.soundBtn.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );

    dom.startSoundBtn.textContent =
      soundEnabled
        ? "🔊 소리 끄기"
        : "🔇 소리 켜기";

    dom.startSoundBtn.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );
  }

  document.addEventListener(
    "DOMContentLoaded",
    init
  );
})();
