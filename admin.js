/* =====================================================
   MEDIRECEPTION AI — ADMIN DASHBOARD
   CLEAN MASTER JAVASCRIPT
   ===================================================== */


/* =====================================================
   DEMO APPOINTMENTS
   ===================================================== */

const demoAppointments = [

    {
        id: "demo1",
        name: "Demo Patient",
        department: "Dermatology",
        date: "29 Aug 2026",
        time: "5:00 PM",
        status: "Pending"
    },

    {
        id: "demo2",
        name: "Sample Patient",
        department: "General Medicine",
        date: "30 Aug 2026",
        time: "11:00 AM",
        status: "Confirmed"
    }

];


/* =====================================================
   DOCTORS
   ===================================================== */

const doctors = [

    {
        name: "Dr. Anjali Sharma",
        department: "General Medicine",
        availability: "Mon–Sat • 10 AM – 2 PM"
    },

    {
        name: "Dr. Raj Mehta",
        department: "Dermatology",
        availability: "Mon–Fri • 4 PM – 8 PM"
    },

    {
        name: "Dr. Neha Patil",
        department: "Pediatrics",
        availability: "Mon–Sat • 11 AM – 3 PM"
    },

    {
        name: "Dr. Amit Deshmukh",
        department: "Orthopedics",
        availability: "Mon/Wed/Fri • 5 PM – 8 PM"
    }

];


/* =====================================================
   DEPARTMENTS
   ===================================================== */

const departments = [

    "General Medicine",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "ENT",
    "Cardiology"

];


/* =====================================================
   AI KNOWLEDGE BASE
   ===================================================== */

const faqs = [

    {
        question: "What are the hospital timings?",
        answer:
            "CityCare Hospital is open Monday to Saturday from 9 AM to 8 PM."
    },

    {
        question: "How can I request an appointment?",
        answer:
            "Patients can request an appointment through the AI receptionist."
    },

    {
        question: "Where is the hospital located?",
        answer:
            "CityCare Hospital is located on Main Road, Maharashtra."
    },

    {
        question: "Does the hospital have emergency services?",
        answer:
            "For emergencies, contact the hospital emergency department immediately."
    },

    {
        question: "Can I speak to a human receptionist?",
        answer:
            "Yes. Patients can request human reception assistance."
    }

];


/* =====================================================
   APPOINTMENT STORAGE
   ===================================================== */

function getAppointments() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem("mediAppointments")
            );

        if (
            Array.isArray(saved) &&
            saved.length > 0
        ) {

            return saved;

        }

    } catch (error) {

        console.log(
            "Appointment storage could not be read."
        );

    }

    return [...demoAppointments];

}


function saveAppointments(appointments) {

    localStorage.setItem(
        "mediAppointments",
        JSON.stringify(appointments)
    );

}


/* =====================================================
   SECTION NAVIGATION
   ===================================================== */

function showSection(id, button) {

    document
        .querySelectorAll(".dashboard-section")
        .forEach(function(section) {

            section.classList.remove(
                "active-section"
            );

        });


    const target =
        document.getElementById(id);


    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(function(item) {

            item.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const titles = {

        overview: "Dashboard Overview",

        appointments: "Appointment Requests",

        doctors: "Doctors",

        departments: "Departments",

        faqs: "AI Knowledge Base",

        settings: "Hospital Settings"

    };


    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    if (pageTitle && titles[id]) {

        pageTitle.innerText =
            titles[id];

    }


    /* Close mobile sidebar */

    closeSidebar();

}


/* =====================================================
   APPOINTMENTS
   ===================================================== */

function renderAppointments() {

    const appointments =
        getAppointments();


    const table =
        document.getElementById(
            "appointmentTable"
        );


    if (!table) return;


    table.innerHTML = "";


    /* SUMMARY */

    const totalElement =
        document.getElementById(
            "totalAppointments"
        );

    const pendingElement =
        document.getElementById(
            "pendingAppointments"
        );

    const confirmedElement =
        document.getElementById(
            "confirmedAppointments"
        );


    const pending =
        appointments.filter(function(item) {

            return item.status === "Pending";

        }).length;


    const confirmed =
        appointments.filter(function(item) {

            return item.status === "Confirmed";

        }).length;


    if (totalElement) {

        totalElement.innerText =
            appointments.length;

    }


    if (pendingElement) {

        pendingElement.innerText =
            pending;

    }


    if (confirmedElement) {

        confirmedElement.innerText =
            confirmed;

    }


    /* TABLE */

    appointments.forEach(function(appointment) {

        const row =
            document.createElement("tr");


        const statusClass =
            String(
                appointment.status || ""
            ).toLowerCase();


        const patientName =
            appointment.name || "Unknown Patient";


        const patientId =
            appointment.id || "N/A";


        row.innerHTML = `

            <td>

                <div class="patient-cell">

                    <div class="patient-avatar">
                        ${patientName
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <strong>
                            ${patientName}
                        </strong>

                        <small>
                            Patient ID: ${patientId}
                        </small>

                    </div>

                </div>

            </td>


            <td>

                <span class="department-tag">
                    ${appointment.department}
                </span>

            </td>


            <td>

                <div class="date-cell">

                    <strong>
                        ${appointment.date}
                    </strong>

                </div>

            </td>


            <td>

                <span class="time-tag">
                    🕐 ${appointment.time}
                </span>

            </td>


            <td>

                <span class="badge ${statusClass}">

                    <span class="status-dot-small"></span>

                    ${appointment.status}

                </span>

            </td>


            <td>

                <div class="appointment-actions">

                    ${
                        appointment.status === "Pending"

                        ?

                        `<button
                            class="action-button confirm-action"
                            onclick="confirmAppointment('${appointment.id}')"
                        >
                            ✓ Confirm
                        </button>`

                        :

                        `<button
                            class="action-button view-action"
                            onclick="viewAppointment('${appointment.id}')"
                        >
                            👁 View
                        </button>`
                    }

                </div>

            </td>

        `;


        table.appendChild(row);

    });


    renderRecentAppointments();

}


function renderRecentAppointments() {

    const container =
        document.getElementById(
            "recentAppointments"
        );


    if (!container) return;


    const appointments =
        getAppointments();


    container.innerHTML = "";


    appointments
        .slice(0, 3)
        .forEach(function(appointment) {

            const item =
                document.createElement("div");


            item.className =
                "appointment-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${appointment.name}
                    </strong>

                    <small>
                        ${appointment.department}
                        •
                        ${appointment.date}
                    </small>

                </div>


                <span class="badge ${String(
                    appointment.status
                ).toLowerCase()}">

                    ${appointment.status}

                </span>

            `;


            container.appendChild(item);

        });


    const count =
        document.getElementById(
            "appointmentCount"
        );


    if (count) {

        count.innerText =
            appointments.length;

    }

}


function confirmAppointment(id) {

    const appointments =
        getAppointments();


    const appointment =
        appointments.find(function(item) {

            return String(item.id) ===
                String(id);

        });


    if (!appointment) return;


    appointment.status =
        "Confirmed";


    saveAppointments(
        appointments
    );


    renderAppointments();


    alert(
        "Appointment marked as confirmed."
    );

}


function viewAppointment(id) {

    const appointment =
        getAppointments().find(
            function(item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!appointment) return;


    alert(

        "Patient: " +
        appointment.name +

        "\nDepartment: " +
        appointment.department +

        "\nDate: " +
        appointment.date +

        "\nTime: " +
        appointment.time +

        "\nStatus: " +
        appointment.status

    );

}


/* =====================================================
   DOCTORS
   ===================================================== */

function renderDoctors() {

    const grid =
        document.getElementById(
            "doctorGrid"
        );


    if (!grid) return;


    grid.innerHTML = "";


    doctors.forEach(function(doctor, index) {

        const card =
            document.createElement("div");


        card.className =
            "doctor-card";


        card.innerHTML = `

            <div class="doctor-card-top">

                <div class="doctor-avatar">
                    👨‍⚕️
                </div>

                <span class="doctor-online">

                    <span></span>

                    Available

                </span>

            </div>


            <div class="doctor-info">

                <h3>
                    ${doctor.name}
                </h3>

                <p class="doctor-speciality">
                    ${doctor.department}
                </p>


                <div class="doctor-detail">

                    <span>
                        🕐
                    </span>

                    <span>
                        ${doctor.availability}
                    </span>

                </div>

            </div>


            <div class="doctor-card-footer">

                <span>
                    🏥 MediReception AI
                </span>

                <button
                    class="doctor-view-button"
                    onclick="viewDoctor(${index})"
                >
                    View
                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}


function viewDoctor(index) {

    const doctor =
        doctors[index];


    if (!doctor) return;


    alert(

        doctor.name +

        "\n\nDepartment: " +
        doctor.department +

        "\nAvailability: " +
        doctor.availability

    );

}


/* =====================================================
   DEPARTMENTS
   ===================================================== */

function renderDepartments() {

    const grid =
        document.getElementById(
            "departmentGrid"
        );


    if (!grid) return;


    grid.innerHTML = "";


    const departmentIcons = [

        "🩺",
        "🧴",
        "🧒",
        "🦴",
        "👂",
        "❤️"

    ];


    const departmentDescriptions = [

        "Primary healthcare and general medical consultations.",

        "Diagnosis and treatment of skin-related conditions.",

        "Specialized healthcare for children and young patients.",

        "Bone, joint and muscle care and treatment.",

        "Specialized care for ear, nose and throat conditions.",

        "Heart health, diagnosis and cardiovascular care."

    ];


    departments.forEach(
        function(department, index) {

            const card =
                document.createElement("div");


            card.className =
                "department-card";


            card.innerHTML = `

                <div class="department-icon">
                    ${departmentIcons[index]}
                </div>


                <div class="department-content">

                    <h3>
                        ${department}
                    </h3>

                    <p>
                        ${departmentDescriptions[index]}
                    </p>

                </div>


                <div class="department-footer">

                    <span>
                        ✓ AI Supported
                    </span>

                    <span>
                        ${index + 1}
                    </span>

                </div>

            `;


            grid.appendChild(card);

        }
    );

}


/* =====================================================
   AI KNOWLEDGE BASE
   ===================================================== */

function renderFAQs() {

    const list =
        document.getElementById(
            "faqList"
        );


    if (!list) return;


    list.innerHTML = "";


    const count =
        document.getElementById(
            "knowledgeCount"
        );


    if (count) {

        count.innerText =
            faqs.length;

    }


    faqs.forEach(
        function(faq, index) {

            const card =
                document.createElement("div");


            card.className =
                "faq-card";


            card.innerHTML = `

                <div class="faq-card-top">

                    <div class="faq-number">
                        ${String(
                            index + 1
                        ).padStart(2, "0")}
                    </div>

                    <span class="faq-status">
                        ✓ Active
                    </span>

                </div>


                <div class="faq-question">

                    <span>
                        Q
                    </span>

                    <strong>
                        ${faq.question}
                    </strong>

                </div>


                <div class="faq-answer">

                    <span>
                        A
                    </span>

                    <p>
                        ${faq.answer}
                    </p>

                </div>


                <div class="faq-footer">

                    <span>
                        🤖 AI Knowledge
                    </span>

                    <span>
                        Entry ${index + 1}
                    </span>

                </div>

            `;


            list.appendChild(card);

        }
    );

}


/* =====================================================
   SETTINGS
   ===================================================== */

function saveSettings() {

    alert(
        "Demo settings saved successfully."
    );

}


/* =====================================================
   NOTIFICATIONS
   ===================================================== */

function toggleNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!panel) return;


    panel.classList.toggle(
        "show"
    );

}


function clearNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    const badge =
        document.getElementById(
            "notificationBadge"
        );


    if (!list) return;


    list.innerHTML = `

        <div class="notification-empty">

            <div>
                ✓
            </div>

            <strong>
                You're all caught up
            </strong>

            <span>
                No new notifications
            </span>

        </div>

    `;


    if (badge) {

        badge.style.display =
            "none";

    }

}


/* =====================================================
   GLOBAL SEARCH
   ===================================================== */

function globalSearch() {

    const input =
        document.getElementById("globalSearch");

    const clearButton =
        document.getElementById("searchClear");


    if (!input) return;


    const query =
        input.value
            .trim()
            .toLowerCase();


    /* SHOW / HIDE CLEAR BUTTON */

    if (clearButton) {

        clearButton.style.display =
            query.length > 0
                ? "block"
                : "none";

    }


    /* =========================================
       DOCTOR SEARCH
       ========================================= */

    document
        .querySelectorAll(".doctor-card")
        .forEach(function(card) {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                query === "" ||
                text.includes(query)
                    ? ""
                    : "none";

        });


    /* =========================================
       DEPARTMENT SEARCH
       ========================================= */

    document
        .querySelectorAll(".department-card")
        .forEach(function(card) {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                query === "" ||
                text.includes(query)
                    ? ""
                    : "none";

        });


    /* =========================================
       FAQ SEARCH
       ========================================= */

    document
        .querySelectorAll(".faq-card")
        .forEach(function(card) {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                query === "" ||
                text.includes(query)
                    ? ""
                    : "none";

        });


    /* =========================================
       APPOINTMENT SEARCH
       ========================================= */

    document
        .querySelectorAll(
            "#appointmentTable tr"
        )
        .forEach(function(row) {

            const text =
                row.textContent.toLowerCase();

            row.style.display =
                query === "" ||
                text.includes(query)
                    ? ""
                    : "none";

        });

}

function clearGlobalSearch() {

    const input =
        document.getElementById("globalSearch");


    const clearButton =
        document.getElementById("searchClear");


    if (!input) return;


    input.value = "";


    if (clearButton) {

        clearButton.style.display =
            "none";

    }


    globalSearch();

    input.focus();

}

/* =====================================================
   MOBILE SIDEBAR
   ===================================================== */
   function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    if (!sidebar || !overlay) return;


    sidebar.classList.toggle(
        "mobile-open"
    );


    overlay.classList.toggle(
        "show",
        sidebar.classList.contains(
            "mobile-open"
        )
    );

}


function closeSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    if (!sidebar || !overlay) return;


    sidebar.classList.remove(
        "mobile-open"
    );


    overlay.classList.remove(
        "show"
    );

}


/* =====================================================
   START DASHBOARD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderAppointments();

        renderDoctors();

        renderDepartments();

        renderFAQs();

    }
);
/* =========================================
   NOTIFICATION PANEL
   ========================================= */

function toggleNotifications() {

    let panel = document.getElementById("notificationPanel");

    if (!panel) {

        panel = document.createElement("div");

        panel.id = "notificationPanel";

        panel.innerHTML = `
            <div class="notification-panel-header">
                <strong>Notifications</strong>
                <button onclick="toggleNotifications()">×</button>
            </div>

            <div class="notification-item">
                <span>📅</span>
                <div>
                    <strong>New Appointment Request</strong>
                    <small>A patient has requested an appointment.</small>
                </div>
            </div>

            <div class="notification-item">
                <span>👨‍⚕️</span>
                <div>
                    <strong>Doctor Schedule Updated</strong>
                    <small>Doctor availability has been updated.</small>
                </div>
            </div>

            <div class="notification-item">
                <span>🤖</span>
                <div>
                    <strong>AI Receptionist Online</strong>
                    <small>MediReception AI is ready to assist patients.</small>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

    }

    panel.classList.toggle("show");
}