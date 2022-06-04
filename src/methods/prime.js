export const prime_numbers_in_range = (begin, end) => {
    let how_many = 0;
    let pointer = begin;
    let flag = null;

    while (pointer < end + 1) {
        flag = 0;

        for (let i = 2; i < pointer; i++) {
            if ((pointer % i) === 0) {
                flag = 1;
                break;
            }
        }

        if (flag === 0) {
            how_many += 1;
        }

        pointer += 1;
    }

    return how_many;
}
