/* =====================================================
   BUSX - BUS ARBITRATION WEBSITE
===================================================== */


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.scrollIntoView({

            behavior: "smooth"

        });

    }

}


function scrollToSimulation() {

    const simulation =
        document.getElementById("simulation");

    simulation.scrollIntoView({

        behavior: "smooth"

    });

}


/* =====================================================
   LIVE VIDEO
===================================================== */

const heroVideo =
    document.querySelector(".hero-video");


if (heroVideo) {

    heroVideo.playbackRate = 0.7;

}


/* =====================================================
   MOUSE PARALLAX EFFECT
===================================================== */

const network =
    document.querySelector(".live-network");


const hero =
    document.querySelector(".live-hero");


if (network && hero) {


    hero.addEventListener(
        "mousemove",
        function(event) {


            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            network.style.transform = `

                translateY(-50%)

                translate(
                    ${x * 20}px,
                    ${y * 20}px
                )

            `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        function() {

            network.style.transform =
                "translateY(-50%)";

        }
    );

}


/* =====================================================
   VIDEO SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    function() {


        const scroll =
            window.scrollY;


        if (heroVideo) {

            heroVideo.style.transform =

                `scale(${1 + scroll * 0.00015})`;

        }


    }
);


/* =====================================================
   BUS ARBITRATION
===================================================== */

function runArbitration() {


    const devices = [


        {

            name: "CPU",

            request:
                document
                .getElementById("cpuRequest")
                .checked,

            priority:
                Number(
                    document
                    .getElementById("cpuPriority")
                    .value
                ),

            node:
                document
                .querySelector(".node1")

        },


        {

            name: "DMA",

            request:
                document
                .getElementById("dmaRequest")
                .checked,

            priority:
                Number(
                    document
                    .getElementById("dmaPriority")
                    .value
                ),

            node:
                document
                .querySelector(".node2")

        },


        {

            name: "I/O",

            request:
                document
                .getElementById("ioRequest")
                .checked,

            priority:
                Number(
                    document
                    .getElementById("ioPriority")
                    .value
                ),

            node:
                document
                .querySelector(".node3")

        },


        {

            name: "GPU",

            request:
                document
                .getElementById("gpuRequest")
                .checked,

            priority:
                Number(
                    document
                    .getElementById("gpuPriority")
                    .value
                ),

            node:
                document
                .querySelector(".node4")

        }


    ];


    /* Reset visual state */


    devices.forEach(
        device => {


            device.node.style.borderColor =
                "rgba(255,255,255,0.1)";


            device.node.style.boxShadow =
                "none";


            device.node.style.transform =
                "scale(1)";


        }
    );


    /* Get requesting devices */


    const requestingDevices =

        devices.filter(
            device =>
                device.request
        );


    const result =
        document.getElementById("result");


    const busStatus =
        document.getElementById("busStatus");


    /* =================================================
       NO REQUEST
    ================================================= */


    if (
        requestingDevices.length === 0
    ) {


        result.classList.remove(
            "success"
        );


        result.innerHTML =

            "⚠️ No device is requesting the bus.";


        busStatus.innerHTML =

            "WAITING FOR REQUEST";


        return;

    }


    /* =================================================
       HIGHEST PRIORITY WINS
    ================================================= */


    requestingDevices.sort(

        (a,b) =>
            b.priority - a.priority

    );


    const winner =
        requestingDevices[0];


    /* Highlight winner */


    winner.node.style.borderColor =
        "#00ff9d";


    winner.node.style.boxShadow =

        "0 0 30px rgba(0,255,157,0.5)";


    winner.node.style.transform =
        "scale(1.15)";


    /* Bus status */


    busStatus.innerHTML =

        "BUS GRANTED → " +
        winner.name;


    /* Result */


    result.classList.add(
        "success"
    );


    result.innerHTML = `

        🟢 <strong>
            ${winner.name}
        </strong>

        gets the bus because it has the
        highest priority

        <strong>
            (${winner.priority})
        </strong>.

    `;


}


/* =====================================================
   RESET SIMULATION
===================================================== */

function resetSimulation() {


    document
        .querySelectorAll(
            '.device-row input[type="checkbox"]'
        )
        .forEach(
            input => {

                input.checked = false;

            }
        );


    document
        .getElementById("cpuPriority")
        .value = 4;


    document
        .getElementById("dmaPriority")
        .value = 3;


    document
        .getElementById("ioPriority")
        .value = 2;


    document
        .getElementById("gpuPriority")
        .value = 1;


    document
        .querySelectorAll(".device-node")
        .forEach(
            node => {


                node.style.borderColor =
                    "rgba(255,255,255,0.1)";


                node.style.boxShadow =
                    "none";


                node.style.transform =
                    "scale(1)";


            }
        );


    document
        .getElementById("busStatus")
        .innerHTML =
            "BUS READY";


    const result =
        document.getElementById("result");


    result.classList.remove(
        "success"
    );


    result.innerHTML =

        "<span>Waiting for requests...</span>";

}


/* =====================================================
   QUIZ
===================================================== */

function checkAnswer(
    button,
    correct
) {


    const result =
        document
        .getElementById("quizResult");


    const buttons =
        document
        .querySelectorAll(
            ".options button"
        );


    buttons.forEach(
        btn => {


            btn.disabled = true;

            btn.style.opacity =
                "0.5";

        }
    );


    button.style.opacity =
        "1";


    if (correct) {


        result.innerHTML =

            "✅ Correct! Bus arbitration decides which device gets access to the shared bus.";


        result.style.color =
            "#00ff9d";


    }

    else {


        result.innerHTML =

            "❌ Not quite. Think about what happens when multiple devices request the bus.";


        result.style.color =
            "#ff6b6b";


    }

}


/* =====================================================
   NAVBAR ACTIVE LINK
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    function() {


        let current = "";


        sections.forEach(
            section => {


                const sectionTop =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {


                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            link => {


                link.style.color =
                    "";


                if (

                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current

                ) {


                    link.style.color =
                        "#00e5ff";

                }

            }
        );


    }
);


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "🚀 BUSX Bus Arbitration System Loaded Successfully!"
);