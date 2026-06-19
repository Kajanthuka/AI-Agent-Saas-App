type EmailInput = {
    sender: string;
    subject: string;
    message: string;
};

export function detectUrgency(text: string) {
    const urgentWords = ["urgent", "asap", "today", "immediately", "important"];
    const value = text.toLowerCase();

    return urgentWords.some((word) => value.includes(word)) ? "High" : "Medium";
}

export function generateSuggestedReply(email: EmailInput) {
    return `Hi ${email.sender}, thanks for your message. I will review this and get back to you shortly.`;
}

export function generateTaskTitle(email: EmailInput) {
    return `Follow up: ${email.subject}`;
}