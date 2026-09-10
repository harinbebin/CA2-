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
