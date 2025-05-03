import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type InputFileProps = {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputFile({handleFileChange}: InputFileProps) {
    const { t } = useTranslation('common');
    const [fileName, setFileName] = useState(t( "button.select-file-placeholder", { ns: "common" }));
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length === 0) return;
        setFileName(event.target.files?.[0]?.name || t("select-file-placeholder", { ns: "common" }));
        handleFileChange(event);
    }
    return (
        <div className="w-full max-w-md space-y-2">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="file"
              className="sr-only"
              id="file-upload"
              onChange={handleChange}
              accept=".xls,.xlsx"
            />
            <label htmlFor="file-upload">
              <button type="button"
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-3 py-2 rounded-md"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Trans ns={"common"}>button.select-file</Trans>
              </button>
            </label>
          </div>
          <div className="flex-1">
            <div className="px-3 py-2 border rounded-md text-sm text-gray-500 w-full">
             {fileName}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Formatos permitidos (.xls)
        </p>
      </div>
    )
}