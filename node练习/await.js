

//await一定要被async包着否则报错
function env() {
    function p(data) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(data)
            }, 2000);
        });
    }

    (async function a() {
        var a1 = await p('a1');
        console.log(a1);
        var a2 = await p('a2');
        console.log(a2);
    })();
}
env();