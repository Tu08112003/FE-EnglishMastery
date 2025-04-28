import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResultCard = ({ wordData, query }) => {
  return (
    <div className="max-w-3xl w-full flex flex-col gap-4">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Kết quả cho: {query}
      </h2>

      {/* Word definition card */}
      <div className="mb-8 rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-3xl font-bold">{wordData.word}</h3>
          <div className="flex items-center">
            <button className="rounded-full p-1 hover:bg-gray-100">
              <FontAwesomeIcon
                icon="fa-solid fa-volume-high"
                size="md"
                style={{ color: "#565E6C" }}
              />
            </button>
            <span className="ml-2 text-gray-600 font-medium">
              {wordData.pronounce || "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <div className="flex gap-5 items-center">
            <h3 className="text-md font-medium">Nghĩa:</h3>
            <p className=" text-gray-600 font-medium list-disc space-y-1">
              {wordData.description?.mean || "Không có nghĩa"}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h3 className="text-md font-medium">Loại từ:</h3>
            <p className=" text-gray-600 font-medium list-disc space-y-1">
              {wordData.description?.wordType || "Không xác định"}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h3 className="text-md font-medium">Ví dụ:</h3>
            <p className=" text-gray-600 font-medium list-disc space-y-1">
              {wordData.description?.example || "Không có ví dụ"}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h3 className="text-md font-medium">Từ đồng nghĩa:</h3>
            <p className=" text-gray-600 font-medium list-disc space-y-1">
              {wordData.description?.synonyms || "Không có từ đồng nghĩa"}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h3 className="text-md font-medium">Từ trái nghĩa:</h3>
            <p className=" text-gray-600 font-medium list-disc space-y-1">
              {wordData.description?.antonym === "none"
                ? "Không có từ trái nghĩa"
                : wordData.description?.antonym}
            </p>
          </div>
        </div>
      </div>

      {/* Synonyms card */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-bold">
          Những từ có nghĩa tương tự
        </h2>
        <div className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md">
          <p className="text-gray-600 font-medium">
            {/* {wordData.description?.synonyms || "Không có từ đồng nghĩa"} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
