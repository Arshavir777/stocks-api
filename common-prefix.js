const commonPrefix = (inputs) => {
    const response = [];

    inputs.forEach(input => {

        let commonPrefixLength = 0;
        const suffixes = [];

        for (let i = 0; i <= input.length; i++) {
            suffixes.push(input.substring(i));
        }

        suffixes.forEach((suffix, i) => {
            let prefix = '';
            for (let i = 0; i < suffix.length; i++) {
                if (suffix[i] === input[i]) {
                    prefix += suffix[i]
                } else {
                    break
                }
            }

            if (prefix) {
                commonPrefixLength += prefix.length
            }
        })
        response.push(commonPrefixLength);
    })

    return response;

}

console.log(commonPrefix(['abcabcd', 'aa', 'ababaa']));
