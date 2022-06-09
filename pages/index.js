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

        function handleOrientation(event) {
            const alpha = event.alpha;
            const beta = event.beta;
            const gamma = event.gamma;
            console.log(pos);
            setSomeText("yes" + event.alpha + event.beta + event.gamma);
            console.log(event)
            console.log(alpha, beta, gamma);
            if(pos === undefined) {
                console.log(pos)
                setPos({
                    alpha,
                    beta,
                    gamma
                })
                return
            }
            if(Math.abs(alpha - pos.alpha) > 10){
                console.log("yes");
            }
        }

        if (!window) return;
        handlePermission();
        let acl = new Accelerometer({frequency: 60});
        acl.addEventListener('reading', () => {
            if(Math.abs(acl.x) > 22) {
                setSomeText("throw")
            }
            console.log("Acceleration along the Y-axis " + acl.y);
            console.log("Acceleration along the Z-axis " + acl.z);
        });

        acl.start();
        // window.addEventListener('accelerometer', handleOrientation);
        window.addEventListener('', handleOrientation);
    }, [pos])


  return (
      <pre>{someText}</pre>
  )
}
