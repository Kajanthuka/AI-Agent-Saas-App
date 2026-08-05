import { NextResponse } from "next/server";
import {
    getCourseApplyInfo,
    getCourseCampuses,
    getCourseContact,
    getCourseEntryRequirements,
    getCourseFees,
    getCourseFuturePathway,
    getCourseHolidayPeriods,
    getCourseIntakes,
    getCourseSummary,
    getCourseTopics,
    getCourseWorkPlacement,
    kitchenManagementCourse,
} from "@/lib/courseKnowledge";

function normalizeMessage(message: string) {
    return message.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

function findAnswer(message: string) {
    const text = normalizeMessage(message);

    const thanksWords = [
        "thank you",
        "thanks",
        "thankyou",
        "ok thanks",
        "okay thanks",
        "thank u",
    ];

    const greetingWords = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
    ];

    const goodbyeWords = [
        "bye",
        "goodbye",
        "see you",
    ];

    if (thanksWords.includes(text)) {
        return "You're welcome. Happy to help.";
    }

    if (greetingWords.includes(text)) {
        return "Hi! How can I help you today?";
    }

    if (goodbyeWords.includes(text)) {
        return "Goodbye. Have a great day.";
    }

    if (
        text.includes("fee") ||
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("tuition") ||
        text.includes("enrollment")
    ) {
        return getCourseFees();
    }

    if (
        text.includes("duration") ||
        text.includes("how long") ||
        text.includes("weeks")
    ) {
        return `The course duration is ${kitchenManagementCourse.duration}, with ${kitchenManagementCourse.termBreak} term break.`;
    }

    if (text.includes("cricos")) {
        return `The CRICOS code for this course is ${kitchenManagementCourse.cricosCode}.`;
    }

    if (
        text.includes("work placement") ||
        text.includes("placement") ||
        text.includes("service period") ||
        text.includes("logbook")
    ) {
        return getCourseWorkPlacement();
    }

    if (
        text.includes("future") ||
        text.includes("pathway") ||
        text.includes("career") ||
        text.includes("job")
    ) {
        return getCourseFuturePathway();
    }

    if (
        text.includes("course name") ||
        text.includes("what course") ||
        text.includes("kitchen management") ||
        text.includes("sit40521")
    ) {
        return getCourseSummary();
    }

    if (
        text.includes("intake") ||
        text.includes("start date") ||
        text.includes("starting date") ||
        text.includes("when start")
    ) {
        return getCourseIntakes();
    }

    if (
        text.includes("holiday") ||
        text.includes("break") ||
        text.includes("term break")
    ) {
        return getCourseHolidayPeriods();
    }

    if (
        text.includes("location") ||
        text.includes("campus") ||
        text.includes("address")
    ) {
        return getCourseCampuses();
    }

    if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("phone") ||
        text.includes("call")
    ) {
        return getCourseContact();
    }

    if (
        text.includes("entry") ||
        text.includes("requirement") ||
        text.includes("ielts") ||
        text.includes("age")
    ) {
        return getCourseEntryRequirements();
    }

    if (
        text.includes("learn") ||
        text.includes("topic") ||
        text.includes("subject") ||
        text.includes("unit")
    ) {
        return getCourseTopics();
    }

    if (
        text.includes("about") ||
        text.includes("details") ||
        text.includes("description")
    ) {
        return kitchenManagementCourse.about;
    }

    if (
        text.includes("apply") ||
        text.includes("enrol") ||
        text.includes("enroll")
    ) {
        return getCourseApplyInfo();
    }

    if (
        text.includes("website") ||
        text.includes("link") ||
        text.includes("url")
    ) {
        return `Course page: ${kitchenManagementCourse.website}`;
    }

    return "Sorry, I can only answer questions related to the course. Please ask about course details, intakes, campus, entry requirements, fees, work placement, contact details, topics, or how to apply.";
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const message = typeof body.message === "string" ? body.message : "";

        if (!message.trim()) {
            return NextResponse.json(
                { reply: "Please type your question." },
                { status: 400 }
            );
        }

        return NextResponse.json({
            reply: findAnswer(message),
        });
    } catch (error) {
        console.error("Chatbot error:", error);

        return NextResponse.json(
            { reply: "Sorry, I could not answer right now. Please try again." },
            { status: 500 }
        );
    }
}