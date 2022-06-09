import {useEffect, useState} from "react";

export default function Home () {
    const [someText, setSomeText] = useState("hi")
    const [pos, setPos] = useState({
        alpha: 0,
        beta: 90,
        gamma: 0
    })


    function report(state) {
        console.log('Permission ' + state);
    }

    useEffect(() => {


        function handlePermission() {
            navigator.permissions.query({name:'accelerometer'}).then(res => {
                if (res.state == 'granted') {
                    report(res.state);
                } else if (res.state == 'prompt') {
                    report(res.state);
                } else if (res.state == 'denied') {
                    report(res.state);
                }
                res.addEventListener('change', function() {
                    report(res.state);
                });
            });
        }

        if (!window) return;
        handlePermission();
        let acl = new Accelerometer({frequency: 60});
        acl.addEventListener('reading', () => {
            if(Math.abs(acl.x) > 15) {
                setSomeText("throw")
            }
            if(Math.abs(acl.z) > 15) {
                setSomeText("throw")
            }
        });

        acl.start();
    }, [pos])


  return (
      <pre>{someText}</pre>
  )
}
