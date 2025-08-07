import { useState } from "react";
import { CONFIG } from "@/shared/model/config";

export const usePersonDownload = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const triggerDownload = async () => {
    setIsLoading(true);
    setShowNotification(true);
    setIsReady(false);

    try {
      await fetch(`${CONFIG.API_BASE_URL}/api/v1/persons/get_excel`);

      setTimeout(
        () => {
          setIsReady(true);
          setIsLoading(false);
        },
        5 * 60 * 1000,
      );
    } catch (err) {
      console.error("Ошибка при подготовке файла:", err);
      setIsLoading(false);
      setShowNotification(false);
    }
  };

  const link = `${CONFIG.API_BASE_URL}/storage/person.zip`;

  return {
    link,
    isReady,
    isLoading,
    showNotification,
    triggerDownload,
  };
};
