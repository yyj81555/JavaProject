const categoryEnum = Object.freeze({
    FOOD: 1, // 사료
    DRY_FOOD :2, // 건식사료
    WET_FOOD : 3,  // 습식사료
    BOIL_FOOD : 4,  // 화식사료
    OTHER_FOOD : 5, // 기타사료

    SNACKS : 10, //  간식
    FROZEN_SNACKS : 11, // 동결간식
    BONE_SNACKS : 12, // 뼈간식
    CHURU_SNACKS : 13, // 츄르
    TREATS_SNACKS : 14, //트릿
    OTEHR_SANCKS : 15,  //기타사료
})

const productState = Object.freeze({
    NOMAL : 0,  // 판매 가능상태
    PAUSE : 1   // 판매 중지상태
})

export { categoryEnum, productState };