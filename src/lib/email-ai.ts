import {
    getCourseApplyInfo,
    getCourseCampuses,
    getCourseContact,
    getCourseEntryRequirements,
    getCourseFees,
    getCourseFuturePathway,
    getCourseIntakes,
    getCourseSummary,
    getCourseWorkPlacement,
    kitchenManagementCourse,
} from "@/lib/courseKnowledge";

type EmailInput = {
    sender: string;
    subject: string;
    message: string;
};

function getSenderName(sender: string) {
    const withoutEmail = sender.replace(/<[^>]+>/g, "").trim();
    const cleanName = withoutEmail.replace(/^"|"$/g, "").trim();

    if (!cleanName || cleanName.includes("@")) {
        return "there";
    }

    return cleanName;
}

export function detectUrgency(text: string) {
    const urgentWords = ["urgent", "asap", "today", "immediately", "important"];
    const value = text.toLowerCase();

    return urgentWords.some((word) => value.includes(word)) ? "High" : "Medium";
}

function isCourseRelatedEmail(text: string) {
    return (
        text.includes("sit40521") ||
        text.includes("kitchen management") ||
        text.includes("certificate iv") ||
        text.includes("course") ||
        text.includes("intake") ||
        text.includes("start date") ||
        text.includes("tuition") ||
        text.includes("fee") ||
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("entry requirement") ||
        text.includes("ielts") ||
        text.includes("campus") ||
        text.includes("location") ||
        text.includes("apply") ||
        text.includes("enrol") ||
        text.includes("enroll") ||
        text.includes("work placement") ||
        text.includes("placement") ||
        text.includes("cricos")
    );
}

function generateCourseEmailReply(email: EmailInput) {
    const text = `${email.subject} ${email.message}`.toLowerCase();
    const senderName = getSenderName(email.sender);

    if (
        text.includes("fee") ||
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("tuition") ||
        text.includes("enrollment")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseFees()}

Please let us know if you would like help with the application process.

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("intake") ||
        text.includes("start date") ||
        text.includes("when start")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseIntakes()}

Please let us know which intake you are interested in.

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("entry") ||
        text.includes("requirement") ||
        text.includes("ielts") ||
        text.includes("age")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseEntryRequirements()}

Please contact the admissions team if you would like your eligibility checked.

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("campus") ||
        text.includes("location") ||
        text.includes("address")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseCampuses()}

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("work placement") ||
        text.includes("placement") ||
        text.includes("service period") ||
        text.includes("logbook")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseWorkPlacement()}

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("apply") ||
        text.includes("enrol") ||
        text.includes("enroll")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseApplyInfo()}

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("future") ||
        text.includes("pathway") ||
        text.includes("career") ||
        text.includes("job")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseFuturePathway()}

Kind regards,
TaskPilot AI`;
    }

    if (
        text.includes("contact") ||
        text.includes("phone") ||
        text.includes("email")
    ) {
        return `Hi ${senderName},

Thank you for your enquiry.

${getCourseContact()}

Kind regards,
TaskPilot AI`;
    }

    if (text.includes("cricos")) {
        return `Hi ${senderName},

Thank you for your enquiry.

The CRICOS code for ${kitchenManagementCourse.code} - ${kitchenManagementCourse.name} is ${kitchenManagementCourse.cricosCode}.

Kind regards,
TaskPilot AI`;
    }

    return `Hi ${senderName},

Thank you for your enquiry about ${kitchenManagementCourse.code} - ${kitchenManagementCourse.name}.

${getCourseSummary()}

For more information, please contact ${kitchenManagementCourse.email} or call ${kitchenManagementCourse.phone}.

Kind regards,
TaskPilot AI`;
}

export function generateSuggestedReply(email: EmailInput) {
    const combinedText = `${email.subject} ${email.message}`.toLowerCase();
    const senderName = getSenderName(email.sender);

    if (isCourseRelatedEmail(combinedText)) {
        return generateCourseEmailReply(email);
    }

    return `Hi ${senderName},

Thank you for your message. I have received your email and will review it shortly.

Kind regards,
TaskPilot AI`;
}

export function generateTaskTitle(email: EmailInput) {
    const combinedText = `${email.subject} ${email.message}`.toLowerCase();

    if (isCourseRelatedEmail(combinedText)) {
        return `Course enquiry: ${email.subject}`;
    }

    return `Follow up: ${email.subject}`;
}