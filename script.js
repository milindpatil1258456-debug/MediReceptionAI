/* =====================================================
   MEDIRECEPTION AI — COMPLETE SCRIPT
   Text Chat + Voice Assistant + Appointments
   ===================================================== */


/* =====================================================
   CHAT SYSTEM
   ===================================================== */

function addMessage(text, type) {

    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerHTML = `
        <div class="avatar">
            ${type === "ai" ? "🤖" : "👤"}
        </div>

        <div class="bubble">
            ${text}
        </div>
    `;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}


/* SEND TEXT MESSAGE */

function sendMessage() {

    const input = document.getElementById("userInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {

        const response = generateResponse(text);

        addMessage(response, "ai");

        speak(response);

    }, 400);
}


/* ENTER KEY */

function handleEnter(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }

}


/* =====================================================
   AI RESPONSE ENGINE
   ===================================================== */

function generateResponse(text) {

    const message = text.toLowerCase().trim();


    /* GREETING */

    if (
        message === "hi" ||
        message === "hello" ||
        message === "hey" ||
        message.includes("good morning") ||
        message.includes("good afternoon") ||
        message.includes("good evening")
    ) {

        return `
        👋 <b>Hello!</b><br><br>

        I'm <b>MediReception AI</b>.

        <br><br>

        I can help you with:

        <br>
        🩺 Finding doctors<br>
        📅 Appointment requests<br>
        🏥 Hospital departments<br>
        🕐 Hospital timings<br>
        📍 Hospital location<br>
        👤 Human reception assistance
        `;

    }


    /* EMERGENCY */

    if (
        message.includes("emergency") ||
        message.includes("urgent") ||
        message.includes("accident") ||
        message.includes("ambulance")
    ) {

        return `
        🚨 <b>Emergency Assistance</b><br><br>

        If this is a medical emergency, please contact
        the hospital emergency department or local
        emergency services immediately.

        <br><br>

        I cannot diagnose or treat medical emergencies.
        `;

    }


    /* APPOINTMENT */

    if (
        message.includes("appointment") ||
        message.includes("book") ||
        message.includes("schedule") ||
        message.includes("meet doctor") ||
        message.includes("see a doctor")
    ) {

        return `
        📅 <b>Appointment Request</b><br><br>

        I can help you request an appointment.

        <br><br>

        Please tap <b>Book Appointment</b> above and
        select your department, preferred date and time.
        `;

    }


    /* DERMATOLOGY */

    if (
        message.includes("skin") ||
        message.includes("dermat") ||
        message.includes("acne")
    ) {

        return `
        👨‍⚕️ <b>Dermatology</b><br><br>

        Available doctor:

        <br><br>

        <b>Dr. Raj Mehta</b><br>
        Dermatology<br>
        Monday–Friday • 4 PM – 8 PM

        <br><br>

        You can request an appointment using
        the <b>Book Appointment</b> button.
        `;

    }


    /* PEDIATRICS */

    if (
        message.includes("child") ||
        message.includes("children") ||
        message.includes("kid") ||
        message.includes("pediatric")
    ) {

        return `
        👶 <b>Pediatrics</b><br><br>

        Available doctor:

        <br><br>

        <b>Dr. Neha Patil</b><br>
        Pediatrics<br>
        Monday–Saturday • 11 AM – 3 PM
        `;

    }


    /* ORTHOPEDICS */

    if (
        message.includes("bone") ||
        message.includes("orthopedic") ||
        message.includes("orthopaedic") ||
        message.includes("joint")
    ) {

        return `
        🦴 <b>Orthopedics</b><br><br>

        Available doctor:

        <br><br>

        <b>Dr. Amit Deshmukh</b><br>
        Orthopedics<br>
        Monday, Wednesday & Friday • 5 PM – 8 PM
        `;

    }


    /* GENERAL MEDICINE */

    if (
        message.includes("general physician") ||
        message.includes("general medicine") ||
        message.includes("physician")
    ) {

        return `
        🩺 <b>General Medicine</b><br><br>

        Available doctor:

        <br><br>

        <b>Dr. Anjali Sharma</b><br>
        General Medicine<br>
        Monday–Saturday • 10 AM – 2 PM
        `;

    }


    /* DOCTORS */

    if (
        message.includes("doctor") ||
        message.includes("doctors") ||
        message.includes("specialist")
    ) {

        return getDoctorText();

    }


    /* DEPARTMENTS */

    if (
        message.includes("department") ||
        message.includes("departments") ||
        message.includes("specialty") ||
        message.includes("specialities")
    ) {

        return `
        🏥 <b>Our Departments</b><br><br>

        • ${hospitalData.departments.join("<br>• ")}
        `;

    }


    /* TIMINGS */

    if (
        message.includes("timing") ||
        message.includes("timings") ||
        message.includes("hours") ||
        message.includes("open") ||
        message.includes("close")
    ) {

        return `
        🕐 <b>Hospital Timings</b><br><br>

        ${hospitalData.timings}
        `;

    }


    /* LOCATION */

    if (
        message.includes("location") ||
        message.includes("address") ||
        message.includes("where") ||
        message.includes("located")
    ) {

        return `
        📍 <b>Hospital Location</b><br><br>

        ${hospitalData.location}
        `;

    }


    /* HUMAN RECEPTION */

    if (
        message.includes("human") ||
        message.includes("reception") ||
        message.includes("staff") ||
        message.includes("person")
    ) {

        return `
        👤 <b>Human Reception</b><br><br>

        You can request assistance from the hospital
        reception team.

        <br><br>

        Please use the <b>Contact Reception</b> button.
        `;

    }


    /* DEFAULT */

    return `
    👋 I'm <b>MediReception AI</b>.

    <br><br>

    I can help you with:

    <br><br>

    🩺 Finding a doctor<br>
    📅 Requesting an appointment<br>
    🏥 Finding a department<br>
    🕐 Hospital timings<br>
    📍 Hospital location<br>
    👤 Human reception assistance

    <br><br>

    Try asking:
    <br>
    <i>"I need a skin doctor"</i>
    `;

}


/* =====================================================
   DOCTOR LIST
   ===================================================== */

function getDoctorText() {

    let result =
        "<b>👨‍⚕️ Available Doctors</b><br><br>";

    if (
        typeof hospitalData === "undefined" ||
        !hospitalData.doctors
    ) {

        return "Doctor information is currently unavailable.";

    }

    hospitalData.doctors.forEach(function (doctor) {

        result += `
            <b>${doctor.name}</b><br>
            ${doctor.department}<br>
            <small>${doctor.availability}</small>

            <br><br>
        `;

    });

    return result;

}


/* =====================================================
   QUICK ACTIONS
   ===================================================== */

function showDoctors() {

    const text = getDoctorText();

    addMessage(text, "ai");

    speak(text);

}


function showDepartments() {

    const text = `
        <b>🏥 Hospital Departments</b><br><br>
        • ${hospitalData.departments.join("<br>• ")}
    `;

    addMessage(text, "ai");

    speak(text);

}


function showInfo() {

    const text = `
        <b>ℹ️ Hospital Information</b><br><br>

        🕐 ${hospitalData.timings}

        <br><br>

        📍 ${hospitalData.location}
    `;

    addMessage(text, "ai");

    speak(text);

}


function emergencyInfo() {

    const text = `
        🚨 <b>Emergency Information</b><br><br>

        ${hospitalData.emergency}
    `;

    addMessage(text, "ai");

    speak(text);

}


function humanHelp() {

    const text = `
        👤 <b>Human Reception</b><br><br>

        Please contact the hospital reception team
        through the hospital's official contact number.
    `;

    addMessage(text, "ai");

    speak(text);

}


/* =====================================================
   TEXT TO SPEECH
   ===================================================== */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        console.log("Text-to-Speech is not supported.");
        return;
    }

    // Remove HTML if the response contains any
    const cleanText = String(text)
        .replace(/<[^>]*>/g, "")
        .trim();

    if (!cleanText) return;

    // Stop any previous speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(cleanText);

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = function () {
        console.log("MediReception AI started speaking");
        updateVoiceStatus("🔊 Speaking...");
    };

    speech.onend = function () {
        console.log("MediReception AI finished speaking");
        updateVoiceStatus("🎤 Ready");
    };

    speech.onerror = function (event) {
        console.log("Speech error:", event.error);
        updateVoiceStatus("⚠️ Voice response unavailable");
    };

    // Small delay can help Android Chrome initialize TTS
    setTimeout(function () {
        window.speechSynthesis.speak(speech);
    }, 100);

}


/* =====================================================
   MEDIRECEPTION AI — VOICE RECOGNITION
   ===================================================== */

let recognition = null;
let isListening = false;

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


/* CHECK SUPPORT */

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.lang = "en-IN";


    /* START */

    recognition.onstart = function () {

        isListening = true;

        updateVoiceStatus("🎤 Listening... Speak now!");

        console.log("VOICE: recognition started");

    };


    /* SOUND DETECTED */

    recognition.onsoundstart = function () {

        updateVoiceStatus("🔊 Sound detected...");

        console.log("VOICE: sound detected");

    };


    /* SPEECH DETECTED */

    recognition.onspeechstart = function () {

        updateVoiceStatus("🗣️ Hearing you...");

        console.log("VOICE: speech detected");

    };


    /* RESULT */

    recognition.onresult = function (event) {

        console.log("VOICE: RESULT RECEIVED");

        const spokenText =
            event.results[0][0].transcript.trim();


        console.log(
            "VOICE TEXT:",
            spokenText
        );


        if (!spokenText) {

            updateVoiceStatus(
                "⚠️ I didn't hear any words."
            );

            return;

        }


        /* SHOW WHAT USER SAID */

        updateVoiceStatus(
            "You said: " + spokenText
        );


        addMessage(
            spokenText,
            "user"
        );


        /* GENERATE AI RESPONSE */

        const response =
            generateResponse(spokenText);


        /* SHOW AI RESPONSE */

        setTimeout(function () {

            addMessage(
                response,
                "ai"
            );

            /*
             * This will work only when
             * Text-to-Speech is supported.
             */

            speak(response);

        }, 400);

    };


    /* NO MATCH */

    recognition.onnomatch = function () {

        console.log(
            "VOICE: No speech match"
        );

        updateVoiceStatus(
            "❌ I couldn't understand that. Try again."
        );

    };


    /* ERROR */

    recognition.onerror = function (event) {

        console.log(
            "VOICE ERROR:",
            event.error
        );


        isListening = false;


        if (event.error === "not-allowed") {

            updateVoiceStatus(
                "🎤 Microphone permission was denied."
            );

        }

        else if (event.error === "no-speech") {

            updateVoiceStatus(
                "🔇 No speech detected. Tap 🎤 and speak."
            );

        }

        else if (event.error === "audio-capture") {

            updateVoiceStatus(
                "🎤 Microphone could not be accessed."
            );

        }

        else {

            updateVoiceStatus(
                "⚠️ Voice error: " + event.error
            );

        }

    };


    /* END */

    recognition.onend = function () {

        isListening = false;

        console.log(
            "VOICE: recognition ended"
        );


        setTimeout(function () {

            updateVoiceStatus(
                "Tap 🎤 and speak"
            );

        }, 1500);

    };

}


/* =====================================================
   START VOICE
   ===================================================== */

function startVoice() {

    startListening();

}


/* =====================================================
   BIG VOICE ASSISTANT BUTTON
   ===================================================== */

function startVoiceAssistant() {

    startListening();

}


/* =====================================================
   START LISTENING
   ===================================================== */

function startListening() {

    if (!SpeechRecognition) {

        updateVoiceStatus(
            "❌ Speech recognition is not supported."
        );

        return;

    }


    if (!recognition) {

        updateVoiceStatus(
            "❌ Voice system could not start."
        );

        return;

    }


    if (isListening) {

        recognition.stop();

        return;

    }


    try {

        updateVoiceStatus(
            "🎤 Starting microphone..."
        );


        recognition.start();


    } catch (error) {

        console.log(
            "START ERROR:",
            error
        );


        updateVoiceStatus(
            "⚠️ Please tap 🎤 again."
        );

    }

}


/* =====================================================
   VOICE STATUS
   ===================================================== */

function updateVoiceStatus(text) {

    const status =
        document.getElementById("voiceStatus");


    if (status) {

        status.innerText = text;

    }

}

/* =====================================================
   APPOINTMENT SYSTEM
   ===================================================== */

function openAppointment() {

    const modal =
        document.getElementById("appointmentModal");

    if (modal) {

        modal.style.display = "flex";

    }

}


function closeAppointment() {

    const modal =
        document.getElementById("appointmentModal");

    if (modal) {

        modal.style.display = "none";

    }

}


function submitAppointment(event) {

    event.preventDefault();


    const appointment = {

        id: Date.now(),

        name:
            document
            .getElementById("patientName")
            .value
            .trim(),

        phone:
            document
            .getElementById("patientPhone")
            .value
            .trim(),

        department:
            document
            .getElementById("doctor")
            .value,

        date:
            document
            .getElementById("appointmentDate")
            .value,

        time:
            document
            .getElementById("appointmentTime")
            .value,

        status: "Pending",

        createdAt:
            new Date().toISOString()

    };


    let appointments =
        JSON.parse(
            localStorage.getItem(
                "mediAppointments"
            ) || "[]"
        );


    appointments.unshift(appointment);


    localStorage.setItem(
        "mediAppointments",
        JSON.stringify(appointments)
    );


    const result =
        document.getElementById(
            "appointmentResult"
        );


    if (result) {

        result.innerHTML = `

            <div style="
                background:#edf8f0;
                padding:15px;
                border-radius:10px;
                margin-top:15px;
            ">

                ✅ <b>Appointment Request Created</b>

                <br><br>

                Patient: ${appointment.name}

                <br>

                Department: ${appointment.department}

                <br>

                Date: ${appointment.date}

                <br>

                Preferred Time: ${appointment.time}

                <br><br>

                The hospital reception team can
                review this request.

            </div>

        `;

    }


    const form =
        document.querySelector(
            "#appointmentModal form"
        );

    if (form) {

        form.reset();

    }

}
