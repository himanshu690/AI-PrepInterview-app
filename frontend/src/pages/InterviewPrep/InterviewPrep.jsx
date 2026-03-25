import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { LuCircleAlert } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";

import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import QuestionCard from '../../components/Cards/QuestionCard'
import AIResponsePreview from './AIResponsePreview'
import Drawer from '../../components/Drawer'
import SkeletonLoader from '../../components/Loader/SkeletonLoader'

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(false);

  // 🔹 Fetch session
  const fetchSessionDetailsById = async () => {
    try {
      setIsSessionLoading(true);
      setErrorMsg("");

      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      } else {
        setErrorMsg("No session data found");
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorMsg("Failed to load session data");
    } finally {
      setIsSessionLoading(false);
    }
  };

  // 🔥 FIXED: Proper JSON parsing for API response
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      console.log("API Response:", response.data);

      let result = response.data?.data || response.data?.explanation;

      if (result) {
        // ✅ HANDLE STRINGIFIED JSON
        if (typeof result === "string") {
          try {
            result = JSON.parse(result);
          } catch (err) {
            console.error("JSON parse error:", err);
            setErrorMsg("Invalid response format from server");
            return;
          }
        }

        setExplanation(result);
      } else {
        setErrorMsg("Failed to generate explanation, API returned no data.");
      }

    } catch (error) {
      setExplanation(null);

      const errMsg =
        error.response?.data?.message ||
        "Failed to generate explanation, try again later";

      setErrorMsg(errMsg);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Pin toggle
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        description={sessionData?.description || ""}
        questions={sessionData?.questions?.length || 0}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold text-black'>
          Interview Q & A
        </h2>

        {/* 🔹 Loading */}
        {isSessionLoading && <SkeletonLoader />}

        {/* 🔹 Error */}
        {errorMsg && !isLoading && (
          <p className='text-red-500 text-sm mt-2'>{errorMsg}</p>
        )}

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div
            className={`
              col-span-12 ${
                openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
              }
            `}
          >
            <AnimatePresence>
              {sessionData?.questions?.length > 0 ? (
                sessionData.questions.map((data, index) => (
                  <motion.div
                    key={data?._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100, // ✅ fixed
                      damping: 15,
                      delay: index * 0.1,
                    }}
                    layout
                    layoutId={`question-${data?._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data?.question || "")
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() =>
                        toggleQuestionPinStatus(data?._id)
                      }
                    />
                  </motion.div>
                ))
              ) : (
                !isSessionLoading && (
                  <p className="text-gray-500">
                    No questions available
                  </p>
                )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 🔹 Drawer */}
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={
            !isLoading
              ? explanation?.title || "Explanation"
              : "Loading..."
          }
        >
          {errorMsg && (
            <p className='flex gap-2 text-sm text-amber-600 font-medium'>
              <LuCircleAlert className='mt-1' /> {errorMsg}
            </p>
          )}

          {isLoading && <SkeletonLoader />}

          {!isLoading && explanation && (
            <AIResponsePreview
              content={explanation?.explanation}
            />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;