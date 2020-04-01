export const get = function <T>(endPoint: string) {
    return new Promise<T>((resolve, reject): void => {
        window
            .fetch(endPoint)
            .then(res => {
                if (204 === res.status) {
                    reject({ code: res.status });
                } else {
                    return res.json();
                }
            })
            .then(resolve)
            .catch(reject);
    });
};
