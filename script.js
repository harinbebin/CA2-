(() => {
  "use strict";

  const STORAGE_KEY = "geneticsEscapeSave";
  const VERSION = 2;

  const ORDER = [
    "basic",
    "pedigree",
    "blood",
    "sex",
    "final"
  ];

  const rooms = {
    basic: {
      name: "유전 기초 교실",
      key: "파란 열쇠",
      color: "blue",
      image: "classroom-basic.png",
      concepts: [
        "DNA는 유전 정보를 저장하는 물질입니다.",
        "유전자는 DNA의 특정 구간이며, 염색체는 DNA와 단백질로 이루어집니다.",
        "대립유전자는 같은 유전자의 서로 다른 형태입니다.",
        "유전자형은 대립유전자의 조합이고, 표현형은 관찰되는 특성입니다.",
        "우성·열성은 발현 관계이지 강함이나 우수함의 차이가 아닙니다.",
        "사람의 많은 특성은 여러 유전자와 환경의 영향을 받습니다."
      ]
    },

    pedigree: {
      name: "가계도 분석실",
      key: "초록 열쇠",
      color: "green",
      image: "classroom-pedigree.png",
      concepts: [
        "사각형은 남성, 원은 여성, 채워진 도형은 조사하는 형질이 나타난 인물입니다.",
        "세대는 로마 숫자, 개인은 왼쪽부터 아라비아 숫자로 표시합니다.",
        "상염색체 열성 모형에서 형질이 나타난 개인의 유전자형은 aa입니다.",
        "상염색체 우성 모형에서 형질이 나타나지 않은 개인은 aa입니다.",
        "완전 우성과 완전 침투를 가정하고 새로운 변이 등은 제외한 가상 학습 사례입니다.",
        "가계도만으로 실제 개인의 질환을 진단할 수 없습니다."
      ]
    },

    blood: {
      name: "ABO 혈액형 교실",
      key: "빨간 열쇠",
      color: "red",
      image: "classroom-blood.png",
      concepts: [
        "A형: IᴬIᴬ 또는 Iᴬi, B형: IᴮIᴮ 또는 Iᴮi입니다.",
        "AB형: IᴬIᴮ, O형: ii입니다.",
        "Iᴬ와 Iᴮ는 공동우성이고, i에 대해서는 우성입니다.",
        "이 활동은 드문 예외를 제외한 일반적인 ABO 유전 모형입니다.",
        "혈액형만으로 실제 친자 관계를 확정할 수 없습니다."
      ]
    },

    sex: {
      name: "성염색체 유전 교실",
      key: "보라색 열쇠",
      color: "purple",
      image: "classroom-sex-linked.png",
      concepts: [
        "학교의 단순화된 모형에서 일반적인 XX와 XY 구성을 다룹니다.",
        "이 문제의 X 연관 열성 모형에서 XᴺXⁿ은 보인자입니다.",
        "XⁿY는 해당 열성 형질을 나타냅니다. Y에는 이 유전자의 대응 대립유전자가 없다고 가정합니다.",
        "실제 보인자의 형질 발현에는 예외가 있을 수 있으나 이 활동에서는 단순 모형을 사용합니다.",
        "성염색체가 개인의 모든 생물학적 특성을 설명하는 것은 아닙니다.",
        "모든 인물은 가상이며, 유전질환은 사람의 가치와 무관합니다."
      ]
    },

    final: {
      name: "종합 문제 교실",
      key: "황금 열쇠",
      color: "gold",
      image: "classroom-final.png",
      concepts: [
        "용어, 가계도, 가능한 유전자형, ABO 혈액형, X 연관 유전을 종합합니다.",
        "각 문제는 독립적입니다. 앞 문제의 답은 다음 문제에 영향을 주지 않습니다.",
        "단일 유전자 모형이 사람의 모든 특징을 설명하지는 못합니다.",
        "확률은 각 출생의 가능성이며 실제 적은 수의 자녀에게 정확한 비율을 보장하지 않습니다."
      ]
    }
  };

  function combine(a, b) {
    const rank = [
      "Iᴬ",
      "Iᴮ",
      "i",
      "A",
      "a"
    ];

    return [a, b]
      .sort(
        (x, y) =>
          rank.indexOf(x) - rank.indexOf(y)
      )
      .join("");
  }

  function Q(
    id,
    room,
    type,
    question,
    choices,
    answer,
    explanation,
    wrong,
    concept,
    hint,
    extra = {}
  ) {
    const data = {
      id,
      room,
      type,
      question,
      choices,
      answer,
      explanation,
      wrongExplanations: wrong,
      concept,
      hint,
      locationId: id,
      keyId: `${room}-key-${id.slice(-2)}`,
      difficulty: type === "punnett" ? 2 : 1,
      ...extra
    };

    if (type === "punnett") {
      data.answer = extra.gametes[1].flatMap(
        row =>
          extra.gametes[0].map(
            column => combine(column, row)
          )
      );
    }

    return data;
  }

  const questions = [
    Q(
      "basic-01",
      "basic",
      "single",
      "DNA・유전자・염색체의 관계를 바르게 설명한 것은?",
      [
        "유전자는 DNA의 특정 구간이며 DNA는 단백질과 함께 염색체를 이룬다.",
        "DNA는 유전자 내부의 단백질이다.",
        "염색체는 DNA와 관계없다.",
        "유전자와 염색체는 같은 뜻이다."
      ],
      0,
      "유전자는 DNA의 특정 구간입니다. DNA는 단백질과 함께 염색체를 구성합니다.",
      [
        "",
        "DNA는 단백질이 아니라 핵산입니다.",
        "염색체는 DNA를 포함합니다.",
        "서로 관련되지만 같은 개념은 아닙니다."
      ],
      "DNA・유전자・염색체",
      "정보를 담는 물질, 그 일부 구간, 포장 구조를 구분하세요."
    ),

    Q(
      "basic-02",
      "basic",
      "single",
      "‘우성 형질은 열성 형질보다 강하고 우수하다.’는 설명은 옳다.",
      [
        "참",
        "거짓"
      ],
      1,
      "우성은 이형접합에서 표현되는 관계입니다. 강함이나 우수함을 의미하지 않습니다.",
      [
        "우성과 가치 판단은 별개의 개념입니다.",
        ""
      ],
      "우성과 열성",
      "우성이라는 용어가 무엇을 설명하는지 생각하세요."
    ),

    Q(
      "basic-03",
      "basic",
      "single",
      "가상의 단일 유전자 모형에서 대립유전자 조합 Aa를 가리키는 용어는?",
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
        "",
        "Aa는 염색체 개수를 표시하지 않습니다.",
        "Aa는 유전적 조합을 나타냅니다."
      ],
      "유전자형",
      "문자 조합과 관찰되는 특성을 구분하세요."
    ),

    Q(
      "basic-04",
      "basic",
      "multi",
      "과학적으로 적절한 설명을 모두 선택하세요.",
      [
        "열성 대립유전자는 표현되지 않는 세대에서도 전달될 수 있다.",
        "표현형은 유전자와 환경의 영향을 받을 수 있다.",
        "사람의 키는 하나의 우성 유전자만으로 결정된다.",
        "우성 대립유전자는 항상 더 흔하다."
      ],
      [0, 1],
      "열성 대립유전자는 이형접합 상태로 전달될 수 있습니다. 많은 표현형은 유전과 환경의 영향을 함께 받습니다.",
      [
        "",
        "",
        "키는 여러 유전자와 환경이 관여하는 복합 형질입니다.",
        "우성과 집단 내 빈도는 다른 개념입니다."
      ],
      "유전 모형의 한계",
      "단일 유전자 모형으로 모든 형질을 설명할 수 있는지 확인하세요."
    ),

    Q(
      "basic-05",
      "basic",
      "punnett",
      "Aa × Aa의 퍼넷 사각형을 완성하세요.",
      [],
      [],
      "각 부모는 A 또는 a를 전달합니다. 두 생식세포를 조합하면 AA, Aa, Aa, aa가 됩니다.",
      [],
      "퍼넷 사각형",
      "위쪽과 왼쪽에서 대립유전자를 하나씩 가져오세요.",
      {
        parents: ["Aa", "Aa"],
        gametes: [
          ["A", "a"],
          ["A", "a"]
        ]
      }
    ),

    Q(
      "pedigree-01",
      "pedigree",
      "single",
      "가계도에서 내부가 채워진 원은 무엇을 뜻하는가?",
      [
        "형질이 나타난 여성",
        "형질이 나타난 남성",
        "형질이 나타나지 않은 여성",
        "세대 번호"
      ],
      0,
      "원은 여성, 내부 채움은 조사하는 형질이 나타남을 의미합니다.",
      [
        "",
        "남성은 사각형으로 표시합니다.",
        "채워진 도형은 형질이 나타남을 뜻합니다.",
        "세대는 로마 숫자로 표시합니다."
      ],
      "가계도 기호",
      "모양과 채움의 의미를 따로 해석하세요.",
      {
        visual: "pedigree"
      }
    ),

    Q(
      "pedigree-02",
      "pedigree",
      "single",
      "가계도에서 II-3은 누구를 뜻하는가?",
      [
        "2세대의 왼쪽에서 세 번째 개인",
        "3세대의 두 번째 개인",
        "2번 염색체의 세 번째 유전자",
        "형질이 세 번 나타난 개인"
      ],
      0,
      "II는 2세대이고, 3은 그 세대의 왼쪽에서 세 번째 개인입니다.",
      [
        "",
        "세대와 개인 번호를 구분하세요.",
        "가계도의 인물 표기입니다.",
        "숫자는 형질이 나타난 횟수가 아닙니다."
      ],
      "세대와 개인 번호",
      "로마 숫자와 아라비아 숫자의 역할을 생각하세요.",
      {
        visual: "pedigree"
      }
    ),

    Q(
      "pedigree-03",
      "pedigree",
      "single",
      "단순한 상염색체 열성 모형에서 형질이 나타나지 않은 두 부모에게 aa 자녀가 태어났다. 부모의 유전자형은?",
      [
        "두 부모 모두 Aa",
        "두 부모 모두 AA",
        "한 부모 AA, 다른 부모 aa",
        "두 부모 모두 aa"
      ],
      0,
      "aa 자녀는 각 부모에게 a를 하나씩 받습니다. 부모에게 형질이 없으므로 두 부모 모두 Aa입니다.",
      [
        "",
        "AA는 a를 전달하지 못합니다.",
        "aa 부모에게는 형질이 나타납니다.",
        "두 부모 모두 형질이 나타나야 합니다."
      ],
      "상염색체 열성",
      "자녀의 a 두 개가 각각 어디에서 왔는지 추적하세요.",
      {
        visual: "pedigree"
      }
    ),

    Q(
      "pedigree-04",
      "pedigree",
      "multi",
      "A가 완전 우성일 때 우성 표현형의 가능한 유전자형을 모두 선택하세요.",
      [
        "AA",
        "Aa",
        "aa"
      ],
      [0, 1],
      "AA와 Aa는 우성 표현형이고, aa는 열성 표현형입니다.",
      [
        "",
        "",
        "aa에는 우성 대립유전자 A가 없습니다."
      ],
      "상염색체 우성",
      "A가 한 개 있을 때도 표현되는지 확인하세요."
    ),

    Q(
      "pedigree-05",
      "pedigree",
      "single",
      "가계도만으로 실제 개인의 유전질환을 확정 진단할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "가계도는 유전 양상의 가능성을 추론하는 자료입니다. 실제 진단에는 임상 정보와 적절한 검사가 필요합니다.",
      [
        "가능성 추론과 확정 진단은 다릅니다.",
        ""
      ],
      "가계도의 한계",
      "학습용 모형과 실제 의료 진단을 구분하세요."
    ),

    Q(
      "blood-01",
      "blood",
      "multi",
      "A형의 가능한 유전자형을 모두 선택하세요.",
      [
        "IᴬIᴬ",
        "Iᴬi",
        "IᴬIᴮ",
        "ii"
      ],
      [0, 1],
      "A형의 유전자형은 IᴬIᴬ 또는 Iᴬi입니다.",
      [
        "",
        "",
        "IᴬIᴮ는 AB형입니다.",
        "ii는 O형입니다."
      ],
      "ABO 유전자형",
      "같은 표현형에 서로 다른 유전자형이 가능한지 살펴보세요."
    ),

    Q(
      "blood-02",
      "blood",
      "single",
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
        "",
        "AB형에서는 두 대립유전자가 모두 표현됩니다.",
        "AB형에서는 두 대립유전자가 모두 표현됩니다.",
        "Iᴬ와 Iᴮ는 각각 i에 대해 우성입니다."
      ],
      "공동우성",
      "AB형에서 두 항원이 함께 나타나는 것을 떠올리세요."
    ),

    Q(
      "blood-03",
      "blood",
      "punnett",
      "Iᴬi × Iᴮi의 퍼넷 사각형을 완성하세요.",
      [],
      [],
      "각 부모가 전달할 수 있는 대립유전자를 조합합니다. IᴬIᴮ, Iᴮi, Iᴬi, ii가 각각 1/4의 확률로 가능합니다.",
      [],
      "ABO 퍼넷 사각형",
      "각 칸의 위쪽과 왼쪽 생식세포를 확인하세요.",
      {
        parents: ["Iᴬi", "Iᴮi"],
        gametes: [
          ["Iᴬ", "i"],
          ["Iᴮ", "i"]
        ]
      }
    ),

    Q(
      "blood-04",
      "blood",
      "single",
      "ii인 부모와 IᴬIᴮ인 부모 사이에서 가능한 자녀 혈액형은?",
      [
        "A형 또는 B형",
        "AB형 또는 O형",
        "A형만",
        "네 혈액형 모두"
      ],
      0,
      "ii 부모는 i만 전달하고 AB형 부모는 Iᴬ 또는 Iᴮ를 전달하므로 Iᴬi 또는 Iᴮi가 가능합니다.",
      [
        "",
        "각 부모가 전달할 수 있는 대립유전자를 다시 확인하세요.",
        "AB형 부모는 Iᴮ도 전달할 수 있습니다.",
        "이 조합에서는 AB형과 O형이 나오지 않습니다."
      ],
      "ABO 조합",
      "부모마다 전달할 수 있는 대립유전자를 적어 보세요."
    ),

    Q(
      "blood-05",
      "blood",
      "single",
      "ABO 혈액형만으로 실제 친자 관계를 확정할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "혈액형으로 일반 모형의 조합 가능성을 검토할 수는 있지만 실제 친자 관계를 확정할 수는 없습니다.",
      [
        "가능한 조합을 검토하는 것과 개인의 관계를 확정하는 것은 다릅니다.",
        ""
      ],
      "혈액형 모형의 한계",
      "같은 혈액형을 가진 사람이 매우 많다는 점을 생각하세요."
    ),

    Q(
      "sex-01",
      "sex",
      "single",
      "일반적인 XY 구성의 단순 모형에서 생식세포에 들어가는 성염색체는?",
      [
        "X 또는 Y",
        "X만",
        "Y만",
        "XY 한 쌍"
      ],
      0,
      "감수분열에서 한 쌍의 성염색체가 분리되므로 생식세포는 X 또는 Y 하나를 가집니다.",
      [
        "",
        "Y를 가진 생식세포도 만들어집니다.",
        "X를 가진 생식세포도 만들어집니다.",
        "생식세포에는 한 쌍이 아니라 하나가 들어갑니다."
      ],
      "성염색체 분리",
      "생식세포와 체세포의 염색체 구성을 구분하세요."
    ),

    Q(
      "sex-02",
      "sex",
      "single",
      "이 활동의 X 연관 열성 모형에서 XᴺXⁿ을 설명한 것은?",
      [
        "보인자이며 열성 형질이 나타나지 않는다.",
        "반드시 열성 형질이 나타난다.",
        "Xⁿ을 자녀에게 전달할 수 없다.",
        "대립유전자가 Y에만 있다."
      ],
      0,
      "완전 우성의 단순 모형에서 XᴺXⁿ은 보인자이며 Xⁿ을 자녀에게 전달할 수 있습니다.",
      [
        "",
        "이 모형에서는 Xᴺ이 함께 있을 때 열성 형질이 나타나지 않습니다.",
        "보유한 대립유전자를 전달할 수 있습니다.",
        "이 문제는 X에 있는 유전자를 다룹니다."
      ],
      "보인자",
      "대립유전자의 보유와 형질의 발현을 구분하세요."
    ),

    Q(
      "sex-03",
      "sex",
      "single",
      "XᴺXⁿ × XᴺY에서 만들어질 수 없는 자녀 유전자형은?",
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
        "첫 번째 부모의 Xᴺ과 두 번째 부모의 Xᴺ이 조합될 수 있습니다.",
        "첫 번째 부모의 Xⁿ과 두 번째 부모의 Xᴺ이 조합될 수 있습니다.",
        "첫 번째 부모의 Xᴺ과 Y가 조합될 수 있습니다.",
        "첫 번째 부모의 Xⁿ과 Y가 조합될 수 있습니다.",
        ""
      ],
      "X 연관 조합",
      "선택한 유전자형을 만들 생식세포가 두 부모에게 실제로 있는지 확인하세요."
    ),

    Q(
      "sex-04",
      "sex",
      "multi",
      "XᴺXⁿ × XⁿY에서 가능한 자녀 유전자형을 모두 선택하세요.",
      [
        "XᴺXⁿ",
        "XⁿXⁿ",
        "XᴺY",
        "XⁿY",
        "YY"
      ],
      [0, 1, 2, 3],
      "가능한 조합은 XᴺXⁿ, XⁿXⁿ, XᴺY, XⁿY입니다. 첫 번째 부모는 X만 전달하므로 YY는 불가능합니다.",
      [
        "",
        "",
        "",
        "",
        "첫 번째 부모는 Y를 전달하지 않습니다."
      ],
      "X 연관 유전",
      "각 부모에게서 성염색체 하나씩을 받아 조합하세요."
    ),

    Q(
      "sex-05",
      "sex",
      "single",
      "성염색체 구성만으로 개인의 모든 생물학적 특성을 완전히 설명할 수 있다.",
      [
        "참",
        "거짓"
      ],
      1,
      "많은 유전자와 발달 과정, 호르몬, 환경 등이 생물학적 특성에 관여합니다.",
      [
        "하나의 정보로 개인의 모든 특성을 설명할 수는 없습니다.",
        ""
      ],
      "유전 모형의 한계",
      "성염색체 외에 관여하는 요인을 생각하세요."
    ),

    Q(
      "final-01",
      "final",
      "single",
      "관찰되는 특성을 뜻하는 용어는?",
      [
        "표현형",
        "유전자형",
        "대립유전자",
        "염색체"
      ],
      0,
      "관찰되는 특성은 표현형입니다. 대립유전자의 조합은 유전자형입니다.",
      [
        "",
        "유전자형은 유전적 조합입니다.",
        "대립유전자는 같은 유전자의 서로 다른 형태입니다.",
        "염색체는 DNA와 단백질로 이루어진 구조입니다."
      ],
      "유전 용어",
      "관찰되는 특성과 문자로 나타낸 조합을 구분하세요."
    ),

    Q(
      "final-02",
      "final",
      "single",
      "새로운 변이가 없고 완전 침투를 가정한 교과서의 단순 상염색체 모형이다. 형질이 없는 두 부모에게 형질이 있는 자녀가 태어났다면 가장 잘 맞는 양상은?",
      [
        "열성",
        "우성",
        "Y 연관이라고 확정",
        "어떤 모형도 고려할 수 없음"
      ],
      0,
      "Aa인 두 부모에게서 aa 자녀가 태어나는 상염색체 열성 모형으로 설명할 수 있습니다.",
      [
        "",
        "주어진 완전 침투의 단순 우성 모형과 맞지 않습니다.",
        "상염색체 모형을 다루고 있으며 Y 연관으로 확정할 근거가 없습니다.",
        "부모가 보인자인 모형을 검토할 수 있습니다."
      ],
      "가계도 추론",
      "부모에게 표현되지 않은 대립유전자가 자녀에게 두 개 모이는 경우를 생각하세요.",
      {
        visual: "pedigree"
      }
    ),

    Q(
      "final-03",
      "final",
      "multi",
      "A가 a에 대해 완전 우성일 때 우성 표현형의 가능한 유전자형을 모두 고르세요.",
      [
        "AA",
        "Aa",
        "aa"
      ],
      [0, 1],
      "A를 하나 이상 가진 AA와 Aa는 우성 표현형입니다.",
      [
        "",
        "",
        "aa는 열성 표현형입니다."
      ],
      "가능한 유전자형",
      "A의 개수와 완전 우성의 의미를 연결하세요."
    ),

    Q(
      "final-04",
      "final",
      "single",
      "Iᴬi × ii에서 가능한 자녀 혈액형은?",
      [
        "A형 또는 O형",
        "A형 또는 B형",
        "AB형 또는 O형",
        "AB형만"
      ],
      0,
      "첫 번째 부모는 Iᴬ 또는 i, 두 번째 부모는 i를 전달하므로 Iᴬi 또는 ii가 가능합니다.",
      [
        "",
        "두 부모에게 Iᴮ가 없습니다.",
        "이 조합에는 Iᴮ가 없어 AB형이 불가능합니다.",
        "AB형을 만들 대립유전자 조합이 없습니다."
      ],
      "ABO 조합",
      "각 부모에게서 대립유전자를 하나씩 받으세요."
    ),

    Q(
      "final-05",
      "final",
      "single",
      "XᴺXⁿ × XᴺY에서 가능한 자녀 중 X 연관 열성 형질이 나타나는 유전자형은?",
      [
        "XⁿY",
        "XᴺXᴺ",
        "XᴺXⁿ",
        "XᴺY"
      ],
      0,
      "이 단순 모형에서 XⁿY는 X에 있는 열성 대립유전자를 표현합니다.",
      [
        "",
        "열성 대립유전자 Xⁿ이 없습니다.",
        "이 활동의 단순 모형에서는 보인자입니다.",
        "열성 대립유전자 Xⁿ이 없습니다."
      ],
      "X 연관 열성",
      "XY에서는 해당 X 연관 유전자의 대립유전자가 하나라는 점을 생각하세요."
    )
  ];

  const byId = new Map(
    questions.map(question => [
      question.id,
      question
    ])
  );

  const positions = [
    [30, 12],
    [49, 25],
    [9, 50],
    [82, 29],
    [70, 68]
  ];

  const dom = {};

  const freshState = () => ({
    version: VERSION,
    started: false,
    finished: false,
    currentRoom: "basic",
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
    streakBonusQuestions: [],
    firstTryStreak: 0,
    reviewNotes: [],
    progress: 0,
    settings: {
      soundEnabled: true
    }
  });

  let state = freshState();

  let activeModal = null;
  let previousFocus = null;
  let currentQuestion = null;

  let practice = false;
  let answered = false;
  let busy = false;

  let confirmAction = null;
  let toastTimer = null;
  let audioContext = null;
  let audioAllowed = false;
  let lastStorageNotice = 0;

  const reducedMotion = () =>
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const wait = milliseconds =>
    new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });

  const escapeHtml = value =>
    String(value).replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character])
    );

  const list = room =>
    questions.filter(
      question => question.room === room
    );

  const doneCount = room =>
    list(room).filter(
      question =>
        state.completedQuestions.includes(
          question.id
        )
    ).length;

  const hintCount = () =>
    Object.values(
      state.hintUsed
    ).filter(Boolean).length;

  function questionScore(question) {
    const tries =
      state.attempts[question.id] || 1;

    const base =
      tries === 1
        ? 100
        : tries === 2
          ? 70
          : 40;

    const deduction =
      state.hintUsed[question.id]
        ? 20
        : 0;

    return Math.max(0, base - deduction);
  }

  // 완료 기록에서 열쇠와 점수를 계산하여
  // 중복 지급을 방지한다.
  function rebuildDerived() {
    state.completedQuestions = [
      ...new Set(state.completedQuestions)
    ].filter(id => byId.has(id));

    state.keys =
      state.completedQuestions.map(id => {
        const question = byId.get(id);

        const number =
          list(question.room).findIndex(
            item => item.id === id
          ) + 1;

        return {
          id: question.keyId,
          room: question.room,
          questionId: id,
          label:
            `${rooms[question.room].name} ` +
            `열쇠 ${number}`,
          color: rooms[question.room].color,
          obtained: true,
          used: state.openedDoors.includes(
            question.room
          )
        };
      });

    state.bonuses.rooms =
      ORDER.filter(
        room => doneCount(room) === 5
      );

    state.progress = Math.round(
      state.completedQuestions.length /
      questions.length *
      100
    );

    const questionPoints =
      state.completedQuestions.reduce(
        (total, id) =>
          total + questionScore(byId.get(id)),
        0
      );

    state.score =
      questionPoints +
      state.streakBonusQuestions.length * 50 +
      state.bonuses.rooms.length * 200 +
      (state.bonuses.final ? 500 : 0);
  }

  function normalizeSave(raw) {
    if (
      !raw ||
      ![1, VERSION].includes(raw.version)
    ) {
      throw new Error("unsupported save");
    }

    const next = freshState();

    for (
      const field of [
        "completedQuestions",
        "openedDoors",
        "reviewNotes"
      ]
    ) {
      if (
        raw[field] !== undefined &&
        !Array.isArray(raw[field])
      ) {
        throw new Error("invalid save");
      }
    }

    next.completedQuestions = [
      ...new Set(raw.completedQuestions || [])
    ].filter(id => byId.has(id));

    for (const question of questions) {
      const value = Number(
        raw.attempts?.[question.id]
      );

      next.attempts[question.id] =
        Number.isSafeInteger(value) &&
        value > 0
          ? Math.min(value, 1000000)
          : 0;

      if (
        next.completedQuestions.includes(
          question.id
        )
      ) {
        next.attempts[question.id] =
          Math.max(
            1,
            next.attempts[question.id]
          );
      }

      if (
        raw.hintUsed?.[question.id] === true
      ) {
        next.hintUsed[question.id] = true;
      }
    }

    // 문을 여는 도중 새로고침하더라도
    // 이미 열린 문 다음 교실에서 복원한다.
    for (const room of ORDER) {
      const opened =
        (raw.openedDoors || []).includes(room);

      const completed =
        list(room).every(question =>
          next.completedQuestions.includes(
            question.id
          )
        );

      if (opened && completed) {
        next.openedDoors.push(room);
      } else {
        break;
      }
    }

    next.currentRoom =
      ORDER[
        Math.min(
          next.openedDoors.length,
          ORDER.length - 1
        )
      ];

    next.finished =
      next.openedDoors.length === ORDER.length;

    next.bonuses.final = next.finished;

    next.settings.soundEnabled =
      raw.settings?.soundEnabled !== false;

    next.started =
      raw.started === true ||
      next.completedQuestions.length > 0 ||
      Object.values(
        next.attempts
      ).some(number => number > 0);

    next.firstTryStreak =
      Number.isSafeInteger(raw.firstTryStreak)
        ? Math.max(
            0,
            Math.min(
              25,
              raw.firstTryStreak
            )
          )
        : 0;

    if (
      Array.isArray(
        raw.streakBonusQuestions
      )
    ) {
      next.streakBonusQuestions = [
        ...new Set(
          raw.streakBonusQuestions
        )
      ].filter(
        id =>
          next.completedQuestions.includes(id) &&
          next.attempts[id] === 1
      );
    } else {
      let streak = 0;

      for (
        const id of next.completedQuestions
      ) {
        streak =
          next.attempts[id] === 1 &&
          !next.hintUsed[id]
            ? streak + 1
            : 0;

        if (
          streak > 0 &&
          streak % 3 === 0
        ) {
          next.streakBonusQuestions.push(id);
        }
      }
    }

    const noteMap = new Map();

    for (
      const note of raw.reviewNotes || []
    ) {
      if (
        !note ||
        !byId.has(note.questionId)
      ) {
        continue;
      }

      noteMap.set(note.questionId, {
        questionId: note.questionId,
        userAnswer: String(
          note.userAnswer || "선택 기록 없음"
        ).slice(0, 1500),
        reason: String(
          note.reason ||
          "문제의 조건을 다시 확인하세요."
        ).slice(0, 1500),
        reviewCompleted:
          note.reviewCompleted === true
      });
    }

    next.reviewNotes = [
      ...noteMap.values()
    ];

    return next;
  }

  function readSave() {
    let text;

    try {
      text =
        localStorage.getItem(STORAGE_KEY);
    } catch {
      showToast(
        "이 브라우저에서는 저장 공간을 사용할 수 없습니다. " +
        "현재 화면의 게임은 계속할 수 있습니다."
      );

      return null;
    }

    if (!text) {
      return null;
    }

    try {
      return normalizeSave(
        JSON.parse(text)
      );
    } catch {
      try {
        localStorage.removeItem(
          STORAGE_KEY
        );
      } catch {}

      showToast(
        "손상되었거나 지원하지 않는 저장 기록을 초기화했습니다."
      );

      return null;
    }
  }

  function save() {
    rebuildDerived();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

      return true;
    } catch {
      if (
        Date.now() - lastStorageNotice >
        10000
      ) {
        showToast(
          "진행 상황을 저장하지 못했습니다. " +
          "브라우저의 사이트 저장 설정을 확인하세요."
        );

        lastStorageNotice = Date.now();
      }

      return false;
    }
  }

  function init() {
    const ids = [
      "main",
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
    ];

    ids.forEach(id => {
      dom[id] =
        document.getElementById(id);
    });

    if (
      ids.some(id => !dom[id])
    ) {
      window.alert(
        "기존 index.html의 필수 요소가 없습니다. " +
        "이전에 제공한 index.html과 함께 사용하세요."
      );

      return;
    }

    // CSS로 숨기는 것이 아니라
    // 캐릭터와 이동 조작 요소를 실제로 제거한다.
    document
      .querySelectorAll(
        "#player, #interactionPrompt, .mobile-controls"
      )
      .forEach(element => {
        element.remove();
      });

    installClickLayout();

    state =
      readSave() || freshState();

    rebuildDerived();
    bindEvents();
    updateSound();
    showStart();

    loadBackground(
      dom.startScreen,
      "school-entrance.png"
    );

    setInterval(() => {
      if (
        state.started &&
        !busy
      ) {
        save();
      }
    }, 5000);
  }

  function installClickLayout() {
    const style =
      document.createElement("style");

    style.textContent = `
      .hud {
        grid-template-columns:
          repeat(6, minmax(0, 1fr)) auto auto;
        gap: .5rem;
      }

      .hud div {
        display: flex !important;
        min-width: 0;
      }

      .hud span {
        font-size: .8rem;
      }

      .hud strong {
        overflow-wrap: anywhere;
      }

      .game-map {
        padding-bottom: 0 !important;
        min-height: 420px;
      }

      .click-guide {
        margin: 0;
        padding: .7rem 1rem;
        background: #fff;
        color: #123b67;
        font-size: 16px;
        line-height: 1.5;
      }

      .hotspot:focus-visible {
        outline: 4px solid #ffb800;
        outline-offset: 4px;
      }

      .concept-preview {
        margin: .8rem 0;
        padding: .8rem;
        background: #eef8fb;
        border-radius: 12px;
      }

      .concept-preview summary {
        cursor: pointer;
        font-weight: 700;
      }

      .punnett {
        width: 100%;
        min-width: 0;
        table-layout: fixed;
      }

      .punnett th,
      .punnett td {
        padding: .35rem;
        overflow-wrap: anywhere;
      }

      .punnett select {
        width: 100%;
        min-width: 0;
        font-size: 16px;
      }

      .cell-message {
        display: block;
        font-size: 14px;
        line-height: 1.4;
        margin-top: .3rem;
      }

      .key-animation {
        white-space: nowrap;
        pointer-events: none;
      }

      .toast {
        border-radius: 14px;
        white-space: pre-line;
        line-height: 1.5;
      }

      .feedback:focus {
        outline: 3px solid #168a8a;
      }

      .pedigree svg {
        width: 100%;
      }

      @media (max-width: 900px) {
        .hud {
          grid-template-columns:
            repeat(3, minmax(0, 1fr)) auto auto;
        }

        .hud div:nth-child(4) {
          grid-column: 1;
        }

        .hud .icon-button {
          align-self: center;
        }
      }

      @media (max-width: 560px) {
        .hud {
          grid-template-columns:
            repeat(2, minmax(0, 1fr)) auto auto;
        }

        .hud div:nth-child(3) {
          grid-column: 1;
        }

        .hud div:nth-child(4) {
          grid-column: auto;
        }

        .hud div:nth-child(5) {
          grid-column: 1;
        }

        .hud strong {
          font-size: 16px;
        }

        .hud .icon-button {
          grid-row: 1;
        }

        .hud .icon-button:last-child {
          grid-column: 4;
        }

        .hud .icon-button:nth-last-child(2) {
          grid-column: 3;
        }

        .modal-card h2 {
          padding-right: 1.8rem;
        }

        .hotspot {
          width: 48px;
          height: 48px;
        }
      }
    `;

    document.head.appendChild(style);

    const guide =
      document.createElement("p");

    guide.className = "click-guide";

    guide.textContent =
      "빛나는 물음표를 클릭·터치해 문제를 풀고, " +
      "열쇠 5개를 모으면 문을 누르세요. " +
      "키보드는 Tab으로 선택하고 Enter로 실행합니다.";

    dom.map.before(guide);

    const helpList =
      document.querySelector(
        "#helpModal ul"
      );

    if (helpList) {
      helpList.innerHTML = [
        "물음표가 있는 조사 지점을 클릭하거나 터치합니다.",
        "키보드는 Tab으로 버튼을 선택하고 Enter 또는 Space로 실행합니다.",
        "문제를 맞히면 해당 교실의 열쇠를 하나 얻습니다.",
        "열쇠 5개를 모은 뒤 문을 누르면 다음 교실로 이동합니다.",
        "힌트는 문제당 한 번만 20점 감점됩니다.",
        "틀린 문제는 제한 없이 다시 풀 수 있습니다.",
        "메뉴의 복습 노트에서 틀린 문제를 다시 풀 수 있습니다."
      ]
        .map(text => `<li>${text}</li>`)
        .join("");
    }

    dom.map.setAttribute(
      "aria-label",
      "조사 지점과 출입문을 직접 선택하는 교실 지도"
    );
  }

  function on(id, action) {
    document
      .getElementById(id)
      ?.addEventListener(
        "click",
        action
      );
  }

  function bindEvents() {
    document.addEventListener(
      "pointerdown",
      () => {
        audioAllowed = true;
      },
      {
        capture: true
      }
    );

    document.addEventListener(
      "keydown",
      event => {
        audioAllowed = true;

        if (!activeModal) {
          return;
        }

        if (
          event.key === "Escape"
        ) {
          event.preventDefault();
          closeModal();
        }

        if (
          event.key === "Tab"
        ) {
          trapFocus(event);
        }
      }
    );

    on("startBtn", () => {
      askConfirm(
        state.started
          ? "새 게임을 시작하면 기존 진행 기록이 초기화됩니다. 시작할까요?"
          : "첫 번째 교실에서 활동을 시작할까요?",
        startNew
      );
    });

    on("continueBtn", () => {
      if (!state.started) {
        return;
      }

      if (state.finished) {
        showResults();
      } else {
        showGame();
      }
    });

    document
      .querySelectorAll("[data-open]")
      .forEach(button => {
        button.addEventListener(
          "click",
          () => {
            openModal(
              button.dataset.open
            );
          }
        );
      });

    document
      .querySelectorAll("[data-close]")
      .forEach(button => {
        button.addEventListener(
          "click",
          closeModal
        );
      });

    on("conceptBtn", () => {
      renderConcept();
      openModal("conceptModal");
    });

    on("reviewBtn", () => {
      renderReview();
      openModal("reviewModal");
    });

    on("saveBtn", () => {
      if (save()) {
        showToast(
          "진행 상황을 저장했습니다."
        );
      }
    });

    on("restartBtn", () => {
      askConfirm(
        "현재 진행을 초기화하고 처음부터 시작할까요?",
        startNew
      );
    });

    on("deleteBtn", () => {
      askConfirm(
        "저장 기록을 삭제할까요? 삭제한 기록은 복구할 수 없습니다.",
        deleteSave
      );
    });

    on("homeBtn", () => {
      save();
      closeModal();
      showStart();
    });

    on("resultRestartBtn", () => {
      askConfirm(
        "결과를 지우고 처음부터 시작할까요?",
        startNew
      );
    });

    on("resultReviewBtn", () => {
      renderReview();
      openModal("reviewModal");
    });

    on("soundBtn", toggleSound);
    on("startSoundBtn", toggleSound);
    on("hintBtn", showHint);
    on("door", openDoor);

    on(
      "confirmCancel",
      closeModal
    );

    on("confirmOk", () => {
      const action = confirmAction;

      closeModal();

      if (action) {
        action();
      }
    });

    dom.answerForm.addEventListener(
      "submit",
      submitAnswer
    );

    document
      .querySelectorAll(".modal")
      .forEach(modal => {
        modal.addEventListener(
          "click",
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

    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.hidden &&
          state.started
        ) {
          save();
        }
      }
    );

    window.addEventListener(
      "pagehide",
      () => {
        if (state.started) {
          save();
        }
      }
    );

    window.addEventListener(
      "resize",
      sizeMap
    );
  }

  function openModal(id) {
    if (busy) {
      return;
    }

    const modal =
      document.getElementById(id);

    if (!modal) {
      return;
    }

    if (!activeModal) {
      previousFocus =
        document.activeElement;
    }

    if (activeModal) {
      activeModal.classList.add(
        "hidden"
      );
    }

    activeModal = modal;

    modal.classList.remove(
      "hidden"
    );

    dom.main.inert = true;

    document.body.style.overflow =
      "hidden";

    modal
      .querySelector(
        "button:not(:disabled), input, select, summary"
      )
      ?.focus();

    sound("open");
  }

  function closeModal() {
    if (
      busy ||
      !activeModal
    ) {
      return;
    }

    activeModal.classList.add(
      "hidden"
    );

    activeModal = null;
    currentQuestion = null;
    answered = false;
    practice = false;

    dom.main.inert = false;

    document.body.style.overflow =
      "";

    if (
      previousFocus?.isConnected
    ) {
      previousFocus.focus();
    } else if (
      !dom.gameScreen.classList.contains(
        "hidden"
      )
    ) {
      dom.hotspots
        .querySelector("button")
        ?.focus();
    } else {
      dom.startBtn.focus();
    }
  }

  function trapFocus(event) {
    const controls = [
      ...activeModal.querySelectorAll(
        "button, input, select, summary, a[href], " +
        "[tabindex]:not([tabindex='-1'])"
      )
    ].filter(
      element =>
        !element.disabled &&
        element.getClientRects().length
    );

    if (!controls.length) {
      return;
    }

    const first = controls[0];

    const last =
      controls[controls.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  function askConfirm(message, action) {
    if (busy) {
      return;
    }

    confirmAction = action;
    dom.confirmText.textContent =
      message;

    openModal("confirmModal");
    dom.confirmCancel.focus();
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

    dom.continueBtn.disabled =
      !state.started;

    updateSound();
  }

  function startNew() {
    const soundEnabled =
      state.settings.soundEnabled;

    state = freshState();

    state.settings.soundEnabled =
      soundEnabled;

    state.started = true;

    save();
    showGame();

    showToast(
      "학교에서 진행되는 유전 학습 방탈출 활동이 시작되었습니다. " +
      "교실에 숨겨진 유전 문제를 해결하면 문을 열 수 있는 열쇠를 얻습니다. " +
      "모든 교실을 통과해 학교 밖으로 나가세요.",
      9000
    );
  }

  function deleteSave() {
    try {
      localStorage.removeItem(
        STORAGE_KEY
      );
    } catch {
      showToast(
        "브라우저의 저장 기록을 삭제하지 못했습니다."
      );

      return;
    }

    state = freshState();

    showStart();

    showToast(
      "저장 기록을 삭제했습니다."
    );
  }

  function showGame() {
    dom.startScreen.classList.add(
      "hidden"
    );

    dom.resultScreen.classList.add(
      "hidden"
    );

    dom.gameScreen.classList.remove(
      "hidden"
    );

    renderRoom();
  }

  function renderRoom() {
    const room =
      rooms[state.currentRoom];

    dom.roomName.textContent =
      room.name;

    dom.roomKeyLabel.textContent =
      `${ORDER.indexOf(
        state.currentRoom
      ) + 1}교실 ${room.key}`;

    dom.map.className =
      `game-map room-${state.currentRoom}`;

    loadBackground(
      dom.map,
      room.image
    );

    const board =
      dom.map.querySelector(
        ".blackboard"
      );

    if (board) {
      board.textContent = room.name;
    }

    const bulletin =
      dom.map.querySelector(
        ".bulletin"
      );

    if (bulletin) {
      const labels = [
        "DNA·유전자",
        "가상 가계도",
        "ABO 혈액형",
        "X 연관 유전",
        "종합 학습"
      ];

      bulletin.textContent =
        labels[
          ORDER.indexOf(
            state.currentRoom
          )
        ];
    }

    renderHotspots();
    updateHud();
    updateDoor();
    renderConcept();
    sizeMap();
  }

  function sizeMap() {
    if (
      dom.gameScreen.classList.contains(
        "hidden"
      )
    ) {
      return;
    }

    const hud =
      document.querySelector(".hud");

    const height = Math.max(
      420,
      window.innerHeight -
      (hud?.offsetHeight || 120) -
      80
    );

    dom.map.style.height =
      `${height}px`;
  }

  function loadBackground(
    element,
    file
  ) {
    element.dataset.imageFile = file;

    element.style.backgroundImage =
      "";

    element.style.backgroundSize =
      "";

    element.style.backgroundPosition =
      "";

    element.classList.remove(
      "has-image"
    );

    const image = new Image();

    image.onload = () => {
      if (
        element.dataset.imageFile !== file
      ) {
        return;
      }

      element.style.backgroundImage =
        `url("assets/${file}")`;

      element.style.backgroundSize =
        "cover";

      element.style.backgroundPosition =
        "center";

      element.classList.add(
        "has-image"
      );
    };

    image.onerror = () => {};

    image.src = `assets/${file}`;
  }

  function renderHotspots() {
    dom.hotspots.replaceChildren();

    list(state.currentRoom)
      .forEach(
        (question, index) => {
          const button =
            document.createElement(
              "button"
            );

          const completed =
            state.completedQuestions.includes(
              question.id
            );

          button.type = "button";

          button.className =
            "hotspot" +
            (
              completed
                ? " completed"
                : ""
            );

          button.style.left =
            `${positions[index][0]}%`;

          button.style.top =
            `${positions[index][1]}%`;

          button.dataset.questionId =
            question.id;

          button.setAttribute(
            "aria-label",
            `${index + 1}번 ${question.concept}` +
            (
              completed
                ? ", 해결 완료"
                : ", 문제 풀기"
            )
          );

          button.title =
            `${index + 1}. ${question.concept}` +
            (
              completed
                ? " · 완료"
                : ""
            );

          button.addEventListener(
            "click",
            () => {
              openQuestion(question);
            }
          );

          dom.hotspots.appendChild(
            button
          );
        }
      );
  }

  function updateHud() {
    dom.scoreValue.textContent =
      String(state.score);

    dom.roomKeys.textContent =
      `🔑 ${doneCount(
        state.currentRoom
      )}/5`;

    dom.totalKeys.textContent =
      `🔑 ${state.keys.length}/25`;

    dom.progressValue.textContent =
      `${state.progress}%`;

    dom.progressBar.style.width =
      `${state.progress}%`;

    dom.hintCount.textContent =
      `${hintCount()}회`;
  }

  function updateDoor() {
    const ready =
      doneCount(
        state.currentRoom
      ) === 5;

    dom.door.className =
      `door ${
        ready
          ? "available"
          : "locked"
      }`;

    dom.door.disabled = false;

    dom.doorLabel.textContent =
      state.currentRoom === "final"
        ? "학교 출구"
        : "다음 교실";

    dom.door.querySelector(
      ".lock"
    ).textContent =
      ready ? "🔓" : "🔒";

    dom.door.setAttribute(
      "aria-label",
      `${ready ? "열 수 있는" : "잠긴"} ` +
      dom.doorLabel.textContent
    );
  }

  function renderConcept() {
    dom.conceptContent.innerHTML = `
      <div class="concept-grid">
        ${
          rooms[state.currentRoom]
            .concepts
            .map(text => `
              <article class="concept-item">
                <p>${escapeHtml(text)}</p>
              </article>
            `)
            .join("")
        }
      </div>
    `;
  }

  function openQuestion(
    question,
    review = false
  ) {
    if (
      busy ||
      !question
    ) {
      return;
    }

    const completed =
      state.completedQuestions.includes(
        question.id
      );

    if (
      completed &&
      !review
    ) {
      showToast(
        "이곳의 문제는 이미 해결했습니다."
      );

      return;
    }

    currentQuestion = question;
    practice = completed && review;
    answered = false;

    dom.problemMeta.textContent =
      `${rooms[question.room].name} · ` +
      (
        practice
          ? "복습 문제"
          : "열쇠 문제"
      );

    dom.problemTitle.textContent =
      question.question;

    dom.problemVisual.innerHTML = `
      <details class="concept-preview">
        <summary>
          풀기 전 개념 카드
        </summary>

        ${
          rooms[question.room]
            .concepts
            .map(text =>
              `<p>${escapeHtml(text)}</p>`
            )
            .join("")
        }
      </details>

      <p
        data-hint
        class="notice hidden"
      ></p>
    `;

    if (
      question.visual === "pedigree"
    ) {
      dom.problemVisual.insertAdjacentHTML(
        "beforeend",
        pedigreeHtml()
      );
    }

    if (
      question.type === "punnett"
    ) {
      dom.problemVisual.insertAdjacentHTML(
        "beforeend",
        punnettHtml(question)
      );
    }

    renderChoices(question);

    dom.feedback.className =
      "feedback hidden";

    dom.feedback.replaceChildren();

    dom.answerForm.querySelector(
      "button[type='submit']"
    ).disabled = false;

    dom.hintBtn.disabled = false;

    dom.hintBtn.textContent =
      state.hintUsed[question.id]
        ? "힌트 다시 보기"
        : "힌트 보기";

    openModal("problemModal");

    if (
      state.hintUsed[question.id]
    ) {
      revealHint(question);
    }
  }

  function renderChoices(question) {
    dom.answerArea.replaceChildren();

    if (
      question.type === "punnett"
    ) {
      return;
    }

    if (
      question.type === "multi"
    ) {
      const instruction =
        document.createElement("p");

      instruction.className =
        "notice";

      instruction.textContent =
        "해당하는 것을 모두 선택하세요.";

      dom.answerArea.appendChild(
        instruction
      );
    }

    const group =
      document.createElement("div");

    group.className =
      "choice-list";

    question.choices.forEach(
      (text, index) => {
        const label =
          document.createElement(
            "label"
          );

        label.className =
          "choice";

        const input =
          document.createElement(
            "input"
          );

        input.type =
          question.type === "multi"
            ? "checkbox"
            : "radio";

        input.name = "answer";
        input.value = String(index);

        label.append(
          input,
          document.createTextNode(text)
        );

        group.appendChild(label);
      }
    );

    dom.answerArea.appendChild(group);
  }

  function pedigreeHtml() {
    return `
      <div class="pedigree">
        <p>모든 인물은 가상입니다.</p>

        <div class="legend">
          <span>□ 남성</span>
          <span>○ 여성</span>
          <span>■·● 형질 나타남</span>
        </div>

        <svg
          viewBox="0 0 420 220"
          role="img"
          aria-label="I-1 남성과 I-2 여성은 형질이 없으며, 자녀 II-1 여성, II-2 남성, II-3 여성 중 II-2에게 형질이 나타납니다."
        >
          <g
            stroke="#172435"
            stroke-width="3"
            fill="none"
          >
            <path
              d="M142 46H264M203 46V105M105 105H305M105 105V130M205 105V130M305 105V130"
            />

            <rect
              x="100"
              y="25"
              width="42"
              height="42"
              fill="white"
            />

            <circle
              cx="285"
              cy="46"
              r="21"
              fill="white"
            />

            <circle
              cx="105"
              cy="153"
              r="21"
              fill="white"
            />

            <rect
              x="184"
              y="132"
              width="42"
              height="42"
              fill="#172435"
            />

            <circle
              cx="305"
              cy="153"
              r="21"
              fill="white"
            />
          </g>

          <g
            fill="#172435"
            font-size="17"
            text-anchor="middle"
          >
            <text x="20" y="50">I</text>
            <text x="20" y="155">II</text>

            <text x="121" y="90">1</text>
            <text x="285" y="90">2</text>

            <text x="105" y="204">1</text>
            <text x="205" y="204">2</text>
            <text x="305" y="204">3</text>
          </g>
        </svg>
      </div>
    `;
  }

  function punnettHtml(question) {
    const options = [
      ...new Set(question.answer)
    ]
      .map(value => `
        <option
          value="${escapeHtml(value)}"
        >
          ${escapeHtml(value)}
        </option>
      `)
      .join("");

    const rows =
      question.gametes[1]
        .map(
          (gamete, row) => `
            <tr>
              <th scope="row">
                ${gamete}
              </th>

              ${
                [0, 1]
                  .map(column => `
                    <td>
                      <select
                        data-cell="${row * 2 + column}"
                        aria-label="${row + 1}행 ${column + 1}열"
                      >
                        <option value="">
                          선택
                        </option>

                        ${options}
                      </select>

                      <span
                        class="cell-message"
                      ></span>
                    </td>
                  `)
                  .join("")
              }
            </tr>
          `
        )
        .join("");

    return `
      <p class="notice">
        부모:
        ${question.parents.join(" × ")}
        <br>

        가로 생식세포:
        ${question.gametes[0].join(", ")}
        <br>

        세로 생식세포:
        ${question.gametes[1].join(", ")}
      </p>

      <div class="punnett-wrap">
        <table class="punnett">
          <caption>
            각 칸을 순서에 맞게 완성하세요.
          </caption>

          <thead>
            <tr>
              <th scope="col">
                생식세포
              </th>

              ${
                question.gametes[0]
                  .map(gamete => `
                    <th scope="col">
                      ${gamete}
                    </th>
                  `)
                  .join("")
              }
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  function readAnswer(question) {
    if (
      question.type === "punnett"
    ) {
      return [
        ...dom.problemVisual.querySelectorAll(
          "[data-cell]"
        )
      ].map(
        select => select.value
      );
    }

    const selected = [
      ...dom.answerArea.querySelectorAll(
        "input:checked"
      )
    ].map(
      input => Number(input.value)
    );

    if (
      question.type === "multi"
    ) {
      return selected;
    }

    return selected.length
      ? selected[0]
      : null;
  }

  function matches(question, answer) {
    if (
      question.type === "punnett"
    ) {
      return (
        Array.isArray(answer) &&
        answer.length === 4 &&
        answer.every(
          (value, index) =>
            value === question.answer[index]
        )
      );
    }

    if (
      question.type === "multi"
    ) {
      return (
        Array.isArray(answer) &&
        answer.length ===
          question.answer.length &&
        [...new Set(answer)].length ===
          answer.length &&
        answer.every(
          value =>
            question.answer.includes(value)
        )
      );
    }

    return (
      Number.isInteger(answer) &&
      answer === question.answer
    );
  }

  function answerText(question, value) {
    if (
      question.type === "punnett"
    ) {
      return value
        .map(
          (item, index) =>
            `${Math.floor(index / 2) + 1}행 ` +
            `${index % 2 + 1}열: ` +
            (item || "미선택")
        )
        .join(" / ");
    }

    if (
      Array.isArray(value)
    ) {
      return value
        .map(
          index => question.choices[index]
        )
        .join(", ") || "선택 없음";
    }

    return (
      question.choices[value] ||
      "선택 없음"
    );
  }

  function wrongReason(
    question,
    value
  ) {
    if (
      question.type === "punnett"
    ) {
      return (
        "일부 칸이 가로·세로 생식세포의 조합과 다릅니다. " +
        "각 칸 아래 안내를 확인하세요."
      );
    }

    if (
      question.type === "multi"
    ) {
      const invalid = value.filter(
        index =>
          !question.answer.includes(index)
      );

      if (invalid.length) {
        return invalid
          .map(
            index =>
              question.wrongExplanations[index]
          )
          .filter(Boolean)
          .join(" ");
      }

      return (
        "선택한 항목만으로는 필요한 설명이 모두 포함되지 않았습니다. " +
        "선택하지 않은 항목도 다시 검토하세요."
      );
    }

    return (
      question.wrongExplanations[value] ||
      "문제에서 제시한 모형과 조건을 다시 확인하세요."
    );
  }

  function highlightCells(
    question,
    values
  ) {
    if (
      question.type !== "punnett"
    ) {
      return;
    }

    dom.problemVisual
      .querySelectorAll("[data-cell]")
      .forEach(
        (select, index) => {
          const correct =
            values[index] ===
            question.answer[index];

          select.style.background =
            correct
              ? "#e7f7ee"
              : "#fdebec";

          select.setAttribute(
            "aria-invalid",
            String(!correct)
          );

          const row =
            Math.floor(index / 2);

          const column =
            index % 2;

          select.nextElementSibling
            .textContent =
            correct
              ? "✓ 올바른 조합"
              : (
                  "✕ 왼쪽 " +
                  question.gametes[1][row] +
                  "와 위쪽 " +
                  question.gametes[0][column] +
                  "를 하나씩 합치세요."
                );
        }
      );
  }

  async function submitAnswer(event) {
    event.preventDefault();

    if (
      busy ||
      answered ||
      !currentQuestion
    ) {
      return;
    }

    const question =
      currentQuestion;

    const value =
      readAnswer(question);

    const incomplete =
      value === null ||
      (
        Array.isArray(value) &&
        (
          !value.length ||
          value.some(
            item => item === ""
          )
        )
      );

    if (incomplete) {
      showToast(
        "답을 선택하거나 모든 칸을 완성하세요."
      );

      return;
    }

    if (
      !practice &&
      state.completedQuestions.includes(
        question.id
      )
    ) {
      return;
    }

    if (!practice) {
      state.attempts[question.id] =
        (
          state.attempts[question.id] ||
          0
        ) + 1;
    }

    highlightCells(
      question,
      value
    );

    if (
      !matches(question, value)
    ) {
      handleWrong(question, value);
      return;
    }

    answered = true;

    dom.answerForm.querySelector(
      "button[type='submit']"
    ).disabled = true;

    if (practice) {
      state.reviewNotes =
        state.reviewNotes.map(
          note =>
            note.questionId === question.id
              ? {
                  ...note,
                  reviewCompleted: true
                }
              : note
        );

      save();
      sound("correct");

      if (
        !dom.resultScreen.classList.contains(
          "hidden"
        )
      ) {
        showResults();
      }

      showCorrect(
        question,
        0,
        true
      );

      return;
    }

    const previousScore =
      state.score;

    state.completedQuestions.push(
      question.id
    );

    state.firstTryStreak =
      state.attempts[question.id] === 1
        ? state.firstTryStreak + 1
        : 0;

    if (
      state.firstTryStreak > 0 &&
      state.firstTryStreak % 3 === 0 &&
      !state.streakBonusQuestions.includes(
        question.id
      )
    ) {
      state.streakBonusQuestions.push(
        question.id
      );
    }

    // 먼저 저장한 뒤 화면과 획득 효과를 갱신한다.
    save();
    updateHud();
    renderHotspots();
    updateDoor();

    const earned =
      state.score - previousScore;

    sound("correct");

    busy = true;

    try {
      await animateKey(
        1,
        dom.problemTitle,
        dom.roomKeys
      );
    } finally {
      busy = false;
    }

    showCorrect(
      question,
      earned,
      false
    );
  }

  function handleWrong(
    question,
    value
  ) {
    const reason =
      wrongReason(question, value);

    if (!practice) {
      state.firstTryStreak = 0;
    }

    const note = {
      questionId: question.id,
      userAnswer:
        answerText(question, value),
      reason,
      reviewCompleted: false
    };

    const existing =
      state.reviewNotes.findIndex(
        item =>
          item.questionId === question.id
      );

    if (existing < 0) {
      state.reviewNotes.push(note);
    } else {
      state.reviewNotes[existing] =
        note;
    }

    save();
    updateHud();
    sound("wrong");

    const detailed =
      practice ||
      state.attempts[question.id] >= 3;

    dom.feedback.className =
      "feedback wrong";

    dom.feedback.innerHTML = `
      <h3>
        ✕ ${
          practice
            ? "다시 생각해 보세요."
            : "아직 열쇠를 얻지 못했습니다."
        }
      </h3>

      <p>
        ${escapeHtml(reason)}
      </p>

      <p>
        관련 개념:
        ${escapeHtml(question.concept)}
      </p>

      ${
        detailed
          ? `
            <details>
              <summary>
                자세한 해설 보기
              </summary>

              <p>
                ${escapeHtml(
                  question.explanation
                )}
              </p>

              <p>
                정답:
                ${escapeHtml(
                  answerText(
                    question,
                    question.answer
                  )
                )}
              </p>
            </details>
          `
          : `
            <p>
              문제의 조건을 하나씩 확인한 뒤
              다시 선택하세요.
            </p>
          `
      }

      <div class="button-row">
        <button
          type="button"
          data-retry
        >
          다시 시도하기
        </button>

        <button
          type="button"
          data-show-hint
        >
          힌트 보기
        </button>
      </div>
    `;

    dom.feedback
      .querySelector("[data-retry]")
      .addEventListener(
        "click",
        () => {
          dom.feedback.classList.add(
            "hidden"
          );

          const firstInput =
            dom.answerArea.querySelector(
              "input"
            ) ||
            dom.problemVisual.querySelector(
              "select"
            );

          firstInput?.focus();
        }
      );

    dom.feedback
      .querySelector(
        "[data-show-hint]"
      )
      .addEventListener(
        "click",
        showHint
      );

    focusFeedback();
  }

  function phenotype(genotype) {
    if (
      genotype === "ii"
    ) {
      return "O형";
    }

    if (
      genotype.includes("Iᴬ") &&
      genotype.includes("Iᴮ")
    ) {
      return "AB형";
    }

    if (
      genotype.includes("Iᴬ")
    ) {
      return "A형";
    }

    if (
      genotype.includes("Iᴮ")
    ) {
      return "B형";
    }

    return genotype === "aa"
      ? "열성 표현형"
      : "우성 표현형";
  }

  function ratios(values) {
    const counts = new Map();

    values.forEach(value => {
      counts.set(
        value,
        (counts.get(value) || 0) + 1
      );
    });

    const gcd = (a, b) =>
      b ? gcd(b, a % b) : a;

    return [
      ...counts
    ]
      .map(
        ([value, count]) => {
          const divisor =
            gcd(
              count,
              values.length
            );

          const fraction =
            `${count / divisor}/` +
            `${values.length / divisor}`;

          const percent =
            count /
            values.length *
            100;

          return (
            `${value} ${fraction} ` +
            `(${percent}%)`
          );
        }
      )
      .join(" · ");
  }

  function showCorrect(
    question,
    earned,
    isPractice
  ) {
    const extra =
      question.type === "punnett"
        ? `
          <p>
            <strong>
              유전자형 비율:
            </strong>

            ${escapeHtml(
              ratios(question.answer)
            )}
          </p>

          <p>
            <strong>
              표현형 비율:
            </strong>

            ${escapeHtml(
              ratios(
                question.answer.map(
                  phenotype
                )
              )
            )}
          </p>

          <p class="notice">
            각 출생에서 가능한 확률입니다.
            실제 적은 수의 자녀에게 반드시
            이 비율이 그대로 나타나지는 않습니다.
          </p>
        `
        : "";

    const reward =
      isPractice
        ? (
            "✓ 복습 완료! " +
            "점수와 열쇠는 중복 지급하지 않습니다."
          )
        : (
            "문을 열 수 있는 열쇠를 얻었습니다. " +
            `(${rooms[question.room].key})` +
            "<br>" +
            `이번 획득 점수: ${earned}점 · ` +
            "기본 점수와 해당 보너스 포함"
          );

    dom.feedback.className =
      "feedback correct";

    dom.feedback.innerHTML = `
      <h3>
        ✓ 정답입니다!
      </h3>

      <p>
        <strong>정답:</strong>

        ${escapeHtml(
          answerText(
            question,
            question.answer
          )
        )}
      </p>

      <p>
        <strong>
          풀이 과정:
        </strong>

        ${escapeHtml(
          question.explanation
        )}
      </p>

      <p>
        <strong>
          관련 개념:
        </strong>

        ${escapeHtml(
          question.concept
        )}
      </p>

      ${extra}

      <p>
        ${reward}
      </p>

      <div class="button-row">
        <button
          type="button"
          data-finish-question
        >
          교실로 돌아가기
        </button>
      </div>
    `;

    dom.feedback
      .querySelector(
        "[data-finish-question]"
      )
      .addEventListener(
        "click",
        () => {
          closeModal();

          if (isPractice) {
            renderReview();
            openModal("reviewModal");
          }
        }
      );

    focusFeedback();
  }

  function focusFeedback() {
    dom.feedback.tabIndex = -1;

    dom.feedback.focus();

    dom.feedback.scrollIntoView({
      block: "nearest",
      behavior:
        reducedMotion()
          ? "auto"
          : "smooth"
    });
  }

  function revealHint(question) {
    const element =
      dom.problemVisual.querySelector(
        "[data-hint]"
      );

    if (!element) {
      return;
    }

    element.textContent =
      `힌트: ${question.hint}` +
      (
        practice
          ? " (복습 힌트는 점수에 영향 없음)"
          : ""
      );

    element.classList.remove(
      "hidden"
    );
  }

  function showHint() {
    if (
      !currentQuestion ||
      busy ||
      answered
    ) {
      return;
    }

    if (
      !practice &&
      !state.hintUsed[
        currentQuestion.id
      ]
    ) {
      state.hintUsed[
        currentQuestion.id
      ] = true;

      save();
      updateHud();
    }

    revealHint(currentQuestion);

    dom.hintBtn.textContent =
      "힌트 다시 보기";
  }

  async function animateKey(
    count,
    source,
    target
  ) {
    if (
      reducedMotion()
    ) {
      return;
    }

    const element =
      dom.keyAnimation;

    const from =
      source.getBoundingClientRect();

    const to =
      target.getBoundingClientRect();

    element.textContent =
      "🔑".repeat(count);

    element.style.animation =
      "none";

    element.style.left =
      `${from.left + from.width / 2}px`;

    element.style.top =
      `${from.top + from.height / 2}px`;

    element.style.fontSize =
      count > 1 ? "25px" : "42px";

    element.classList.remove(
      "hidden"
    );

    sound("key");

    const deltaX =
      to.left +
      to.width / 2 -
      from.left -
      from.width / 2;

    const deltaY =
      to.top +
      to.height / 2 -
      from.top -
      from.height / 2;

    try {
      if (
        typeof element.animate ===
        "function"
      ) {
        const animation =
          element.animate(
            [
              {
                transform:
                  "translate(-50%,-50%) scale(1)",
                opacity: 1
              },
              {
                transform:
                  "translate(" +
                  `calc(-50% + ${deltaX}px),` +
                  `calc(-50% + ${deltaY}px)` +
                  ") scale(.4)",
                opacity: 0
              }
            ],
            {
              duration: 600,
              easing: "ease-in",
              fill: "forwards"
            }
          );

        await animation.finished;
      } else {
        await wait(350);
      }
    } catch {
    } finally {
      element.classList.add(
        "hidden"
      );
    }
  }

  async function openDoor() {
    if (
      busy ||
      activeModal ||
      state.finished
    ) {
      return;
    }

    const room =
      state.currentRoom;

    const count =
      doneCount(room);

    if (
      count !== 5
    ) {
      showToast(
        "문을 열려면 열쇠가 더 필요합니다. " +
        "교실에 남아 있는 유전 문제를 찾아보세요.\n" +
        `${rooms[room].key} ${count}/5개`,
        6000
      );

      return;
    }

    if (
      state.openedDoors.includes(
        room
      )
    ) {
      return;
    }

    busy = true;
    dom.door.disabled = true;

    try {
      await animateKey(
        5,
        dom.roomKeys,
        dom.door
      );

      state.openedDoors.push(room);

      const index =
        ORDER.indexOf(room);

      if (
        index === ORDER.length - 1
      ) {
        state.finished = true;
        state.bonuses.final = true;
      } else {
        state.currentRoom =
          ORDER[index + 1];
      }

      save();
      sound("unlock");

      dom.door.querySelector(
        ".lock"
      ).textContent = "✓";

      dom.door.className =
        "door open";

      if (
        !reducedMotion()
      ) {
        await wait(350);
      }

      sound("door");

      dom.transition.classList.remove(
        "hidden"
      );

      if (
        !reducedMotion()
      ) {
        await wait(350);
      }

      if (
        state.finished
      ) {
        sound("finish");
        showResults();
      } else {
        renderRoom();
      }

      if (
        !reducedMotion()
      ) {
        await wait(500);
      }
    } finally {
      dom.transition.classList.add(
        "hidden"
      );

      busy = false;
      dom.door.disabled = false;
    }

    if (
      !state.finished
    ) {
      dom.hotspots
        .querySelector("button")
        ?.focus();
    }
  }

  function renderReview() {
    dom.reviewList.replaceChildren();

    if (
      !state.reviewNotes.length
    ) {
      dom.reviewList.textContent =
        "아직 틀린 문제가 없습니다. " +
        "오답은 이곳에 자동으로 기록됩니다.";

      return;
    }

    for (
      const note of state.reviewNotes
    ) {
      const question =
        byId.get(note.questionId);

      const article =
        document.createElement(
          "article"
        );

      article.className =
        "review-item" +
        (
          note.reviewCompleted
            ? " done"
            : ""
        );

      article.innerHTML = `
        <h3>
          ${
            note.reviewCompleted
              ? "✓ 복습 완료"
              : "복습 필요"
          }

          · ${escapeHtml(
            question.question
          )}
        </h3>

        <p>
          <strong>
            선택한 답:
          </strong>

          ${escapeHtml(
            note.userAnswer
          )}
        </p>

        <p>
          <strong>
            정답:
          </strong>

          ${escapeHtml(
            answerText(
              question,
              question.answer
            )
          )}
        </p>

        <p>
          <strong>
            오답 이유:
          </strong>

          ${escapeHtml(
            note.reason
          )}
        </p>

        <p>
          <strong>
            풀이 과정:
          </strong>

          ${escapeHtml(
            question.explanation
          )}
        </p>

        <p>
          <strong>
            관련 개념:
          </strong>

          ${escapeHtml(
            question.concept
          )}
        </p>
      `;

      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.textContent =
        "다시 풀기";

      button.addEventListener(
        "click",
        () => {
          openQuestion(
            question,
            true
          );
        }
      );

      article.appendChild(button);

      dom.reviewList.appendChild(
        article
      );
    }
  }

  function accuracy(room) {
    const selected =
      room
        ? list(room)
        : questions;

    const completed =
      selected.filter(
        question =>
          state.completedQuestions.includes(
            question.id
          )
      ).length;

    const attempts =
      selected.reduce(
        (sum, question) =>
          sum +
          (
            state.attempts[
              question.id
            ] || 0
          ),
        0
      );

    return attempts
      ? Math.round(
          completed /
          attempts *
          100
        )
      : 0;
  }

  function showResults() {
    rebuildDerived();
    updateHud();

    dom.startScreen.classList.add(
      "hidden"
    );

    dom.gameScreen.classList.add(
      "hidden"
    );

    dom.resultScreen.classList.remove(
      "hidden"
    );

    const overall =
      accuracy();

    const unitResults =
      ORDER.map(room => ({
        room,
        rate: accuracy(room)
      }));

    const highest =
      Math.max(
        ...unitResults.map(
          item => item.rate
        )
      );

    const best =
      unitResults
        .filter(
          item =>
            item.rate === highest
        )
        .map(
          item =>
            rooms[item.room].name
        )
        .join(", ");

    const reviewUnits =
      unitResults
        .filter(
          item =>
            item.rate < 90 ||
            state.reviewNotes.some(
              note =>
                byId.get(
                  note.questionId
                ).room === item.room &&
                !note.reviewCompleted
            )
        )
        .map(
          item =>
            rooms[item.room].name
        )
        .join(", ") || "없음";

    dom.resultGrade.textContent =
      overall >= 90
        ? "완벽한 탈출"
        : overall >= 80
          ? "뛰어난 탈출"
          : overall >= 70
            ? "성공적인 탈출"
            : "탈출 성공—복습 권장";

    const statistics = [
      [
        "최종 점수",
        `${state.score}점`
      ],
      [
        "전체 정답률",
        `${overall}%`
      ],
      [
        "획득한 열쇠",
        `${state.keys.length}/25개`
      ],
      [
        "사용한 힌트",
        `${hintCount()}회`
      ],
      [
        "가장 높은 단원",
        best
      ],
      [
        "추가 복습 단원",
        reviewUnits
      ],
      ...unitResults.map(item => [
        rooms[item.room].name,
        `${item.rate}%`
      ])
    ];

    dom.resultStats.innerHTML =
      statistics
        .map(
          ([label, value]) => `
            <div class="stat-card">
              <strong>
                ${escapeHtml(label)}
              </strong>

              <p>
                ${escapeHtml(value)}
              </p>
            </div>
          `
        )
        .join("") +
      `
        <p class="notice">
          정답률은 본 게임의 정답 제출 횟수
          ÷ 전체 답 제출 횟수입니다.
          복습 제출은 계산에 포함하지 않습니다.
          다른 사람과 비교하는 순위가 아닙니다.
        </p>
      `;
  }

  function showToast(
    message,
    duration = 4500
  ) {
    if (!dom.toast) {
      return;
    }

    clearTimeout(toastTimer);

    dom.toast.textContent =
      message;

    dom.accessibleStatus.textContent =
      message;

    dom.toast.classList.remove(
      "hidden"
    );

    toastTimer = setTimeout(
      () => {
        dom.toast.classList.add(
          "hidden"
        );
      },
      duration
    );
  }

  function sound(type) {
    if (
      !audioAllowed ||
      !state.settings.soundEnabled
    ) {
      return;
    }

    try {
      const Audio =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!Audio) {
        return;
      }

      audioContext ||=
        new Audio();

      if (
        audioContext.state === "suspended"
      ) {
        audioContext
          .resume()
          .catch(() => {});
      }

      const tones = {
        open: [440, 0.07],
        correct: [660, 0.14],
        wrong: [180, 0.12],
        key: [880, 0.18],
        unlock: [520, 0.2],
        door: [260, 0.18],
        finish: [784, 0.4],
        button: [330, 0.05]
      };

      const [
        frequency,
        duration
      ] =
        tones[type] ||
        tones.button;

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type =
        "sine";

      oscillator.frequency.value =
        frequency;

      gain.gain.setValueAtTime(
        0.025,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime +
        duration
      );

      oscillator
        .connect(gain)
        .connect(
          audioContext.destination
        );

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime +
        duration
      );
    } catch {}
  }

  function toggleSound() {
    state.settings.soundEnabled =
      !state.settings.soundEnabled;

    save();
    updateSound();
    sound("button");
  }

  function updateSound() {
    const enabled =
      state.settings.soundEnabled;

    dom.soundBtn.textContent =
      enabled ? "🔊" : "🔇";

    dom.soundBtn.setAttribute(
      "aria-label",
      enabled
        ? "소리 끄기"
        : "소리 켜기"
    );

    dom.soundBtn.setAttribute(
      "aria-pressed",
      String(enabled)
    );

    dom.startSoundBtn.textContent =
      enabled
        ? "🔊 소리 끄기"
        : "🔇 소리 켜기";

    dom.startSoundBtn.setAttribute(
      "aria-pressed",
      String(enabled)
    );
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }
})();
