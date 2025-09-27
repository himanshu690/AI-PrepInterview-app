export const BASE_URL= "http://localhost:8000";

export const API_PATHS = {

    AUTH: {

        REGISTER: "/api/auth/register", // Signup
        LOGIN: "/api/auth/login", // Authenticate user & return
        GET_PROFILE: "/api/auth/profile", // Get logged-in user
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profil
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // Gene
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", //
    },

    SESSION: {
        CREATE: "/api/sessions/create", // Create a new interview
        GET_ALL: "/api/sessions/my-sessions", // Get all user ses
        GET_ONE: (id) => `/api/sessions/${id}`,
        DELETE: (id) => `/api/sessions/${id}`
    },

    QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add more questions to a session
    PIN: (id) => `/api/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note t

},


}