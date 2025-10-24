{
    function data() {


        sendToApp(
            "create_tasks",
            buildJsonMessage("MESSAGE", jsonToString({
                nameTask: "",
                tasks: [
                    {
                        name: "Bắt đầu",
                        js: null,
                        type: "JS_NOW",
                        timeOut: 60,
                        action: "AUTO",
                        param: {},
                        url: null
                    },
                    {
                        name: "Xoá Cookie",
                        js: null,
                        type: "DELETE_COOKIE",
                        timeOut: 60,
                        action: "AUTO",
                        param: { url: "https://forum.dichtienghoa.com" },
                        url: null
                    }
                ],
                id: "login",
                source: ""
            }), "action")
        );
    }
    data();
}
