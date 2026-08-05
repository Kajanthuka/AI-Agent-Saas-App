export type CourseKnowledge = {
    code: string;
    name: string;
    cricosCode: string;
    level: string;
    duration: string;
    termBreak: string;
    provider: string;
    website: string;
    location: string;
    mascotCampus: string;
    burwoodCampus: string;
    email: string;
    phone: string;
    totalTuitionFee: string;
    nonTuitionFee: string;
    enrollmentFee: string;
    intakes2026: string[];
    holidayPeriods2026: string[];
    about: string;
    entryRequirements: string[];
    workPlacement: string[];
    futurePathway: string;
    topics: string[];
    quickQuestions: string[];
};

export const kitchenManagementCourse: CourseKnowledge = {
    code: "SIT40521",
    name: "Certificate IV in Kitchen Management",
    cricosCode: "112159A",
    level: "Intermediate",
    duration: "78 Weeks",
    termBreak: "18 Weeks",
    provider: "Australian Business Skills College (ABSC)",
    website: "https://absc.nsw.edu.au/course/sit40521-certificate-iv-in-kitchen-management/",
    location: "Sydney, NSW, Australia",
    mascotCampus: "263-273 King Street, Mascot NSW 2020 Australia",
    burwoodCampus: "Level 3, 14 Railway Pde, Burwood NSW 2134 Australia",
    email: "enrolments@absc.nsw.edu.au",
    phone: "02 7228 8340",
    totalTuitionFee: "AUD 18,000",
    nonTuitionFee: "AUD 1,750",
    enrollmentFee: "AUD 250",
    intakes2026: ["05-Jan-26", "06-Apr-26", "06-Jul-26", "05-Oct-26"],
    holidayPeriods2026: [
        "16 Mar - 5 Apr 26",
        "15 Jun - 5 Jul 26",
        "14 Sep - 4 Oct 26",
        "14 Dec - 3 Jan 27",
    ],
    about:
        "This qualification reflects the role of chefs and cooks who have a supervisory or team leading role in the kitchen. They operate independently or with limited guidance from others and use discretion to solve non-routine problems. This qualification provides a pathway to work in organisations such as restaurants, hotels, clubs, pubs, cafes and coffee shops, or to run a small business in these sectors. The skills in this qualification must be applied in accordance with Commonwealth and State or Territory legislation, Australian standards and industry codes of practice. No occupational licensing, certification or specific legislative requirements apply to this qualification at the time of publication.",
    entryRequirements: [
        "Students must be 18 years or older, as underage students are not trained by ABSC.",
        "Applicants need a minimum of the Australian HSC, or an equivalent or higher qualification, as an indication of the required academic level.",
        "Applicants need IELTS 5.5 or an equivalent English score.",
        "Applicants need to have the mental, emotional and physical capability and willingness to work in the kitchen management industry on a daily basis.",
        "Capability and willingness will be assessed through the Student Enrolment Assessment Interview Form at the time of enrolment.",
    ],
    workPlacement: [
        "ABSC has included a work placement component in the delivery of SIT40521.",
        "Students must complete a minimum of 48 service periods associated with the unit SITHCCC043 Work effectively as a Cook.",
        "Work placement helps students develop skills and applied knowledge in a real workplace.",
        "Students must maintain a Practical Placement Logbook so completed hours can be recorded and monitored.",
    ],
    futurePathway:
        "This qualification provides a pathway to work as a chef or cook with supervisory or team leading responsibilities in restaurants, hotels, clubs, pubs, cafes, coffee shops, or to run a small business in the hospitality sector.",
    topics: [
        "Kitchen operations",
        "Cookery skills",
        "Kitchen supervision",
        "Team leadership",
        "Food preparation",
        "Workplace safety",
        "Hospitality workplace skills",
        "Practical work placement",
    ],
    quickQuestions: [
        "What is this course?",
        "What is the CRICOS code?",
        "How long is the course?",
        "What is the tuition fee?",
        "What are the entry requirements?",
        "Is work placement required?",
        "What are the intakes?",
        "Where is the campus?",
        "How can I apply?",
    ],
};

export function getCourseSummary() {
    return `${kitchenManagementCourse.code} - ${kitchenManagementCourse.name} is offered by ${kitchenManagementCourse.provider}. CRICOS Code: ${kitchenManagementCourse.cricosCode}. Level: ${kitchenManagementCourse.level}. Duration: ${kitchenManagementCourse.duration}, with ${kitchenManagementCourse.termBreak} term break.`;
}

export function getCourseFees() {
    return `Price breakdown: Total tuition fee is ${kitchenManagementCourse.totalTuitionFee}. Non-tuition fee is ${kitchenManagementCourse.nonTuitionFee}. Enrollment fee is ${kitchenManagementCourse.enrollmentFee}.`;
}

export function getCourseIntakes() {
    return `The 2026 intake dates for ${kitchenManagementCourse.code} are: ${kitchenManagementCourse.intakes2026.join(", ")}.`;
}

export function getCourseHolidayPeriods() {
    return `The 2026 holiday periods for this course are: ${kitchenManagementCourse.holidayPeriods2026.join(", ")}.`;
}

export function getCourseCampuses() {
    return `ABSC campus details: Mascot campus - ${kitchenManagementCourse.mascotCampus}. Burwood campus - ${kitchenManagementCourse.burwoodCampus}.`;
}

export function getCourseContact() {
    return `You can contact ABSC by email at ${kitchenManagementCourse.email} or by phone at ${kitchenManagementCourse.phone}.`;
}

export function getCourseEntryRequirements() {
    return `Entry requirements: ${kitchenManagementCourse.entryRequirements.join(" ")}`;
}

export function getCourseTopics() {
    return `This course covers areas such as: ${kitchenManagementCourse.topics.join(", ")}.`;
}

export function getCourseWorkPlacement() {
    return `Work placement requirements: ${kitchenManagementCourse.workPlacement.join(" ")}`;
}

export function getCourseFuturePathway() {
    return kitchenManagementCourse.futurePathway;
}

export function getCourseApplyInfo() {
    return `To apply for ${kitchenManagementCourse.name}, visit ${kitchenManagementCourse.website} or contact ABSC at ${kitchenManagementCourse.email}.`;
}