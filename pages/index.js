import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";

export default function Home () {
    const [someText, setSomeText] = useState("hi")
    const [pos, setPos] = useState({
        alpha: 0,
        beta: 90,
        gamma: 0
    })

    function handlePermission() {
        navigator.permissions.query({name:'accelerometer'}).then(function(result) {
            if (result.state == 'granted') {
                report(result.state);
            } else if (result.state == 'prompt') {
                report(result.state);
            } else if (result.state == 'denied') {
                report(result.state);
            }
            result.addEventListener('change', function() {
                report(result.state);
            });
        });
    }

    function report(state) {
        console.log('Permission ' + state);
    }

    useEffect(() => {
        if (window === "undefined") return;
        console.log(window)
        handlePermission();
        // window.addEventListener('accelerometer', handleOrientation);
        window.addEventListener('devicemotion', handleOrientation);
    }, [handleOrientation, handlePermission])




    function handleOrientation(event) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        console.log(pos)
        setSomeText(JSON.stringify(event, 2, 2));
        if(pos === undefined) {
            console.log(pos)
            this.setPos({
                alpha,
                beta,
                gamma
            })
            return
        }
        setPos({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
        if(Math.abs(alpha - pos.alpha) > 10){
            console.log("yes");
        }


    }

  return (
      <pre>{someText}</pre>
  )
}
