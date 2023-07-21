function filterCartesian(params, pairRestrictions) {
    function* recur(i, restrictions) {
        if (i >= params.length) return yield [];
        const restriction = restrictions?.[i];
        const limit = Array.isArray(restriction) && new Set(restriction);
        for (const value of params[i]) {
            if (limit && !limit.has(value)) continue;
            for (const result of recur(i + 1, restriction?.[value])) {
                yield [value, ...result];
            }
        }
    }    
    return [...recur(0, pairRestrictions)];
}

let params = [[1,2,3], ["A","B","C"], [10,11,12]];
let pairRestrictions = {0:{2:{1:["A","B"]}}};
console.log(filterCartesian(params, pairRestrictions));
