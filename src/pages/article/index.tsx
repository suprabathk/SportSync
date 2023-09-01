import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ArticleDetails } from "../../types/types";
import { ThemeContext } from "../../context/theme";

const ArticleModal = () => {
  const { theme } = useContext(ThemeContext);
  const [article, setArticle] = useState<ArticleDetails | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { articleID } = useParams();
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const fetchArticle = () => {
    fetch(`${API_ENDPOINT}/articles/${articleID}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setIsOpen(true);
      });
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div
            className={`fixed inset-0 overflow-y-auto ${
              theme === "dark" && "dark"
            }`}
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-sky-700 dark:bg-black text-white text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-600">
                  <div
                    className="p-6"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${article?.thumbnail})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-white mb-2"
                    >
                      {article?.title}
                    </Dialog.Title>
                    <p className="mb-4 text-sm">{article?.summary}</p>
                    <div className="text-sm text-white mb-1">
                      {article?.teams.map((team, id) => (
                        <span key={id}>
                          <span>{team.name}</span>
                          {article.teams.length !== id + 1 && " VS "}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-1 gap-6 ">
                      <p className="text-sm font-bold">{article?.sport.name}</p>
                      <div className="flex items-center text-sm gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <p>
                          {article?.date &&
                            new Date(article.date).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 text-black dark:bg-black dark:text-white">
                    <p className="font-bold text-lg">Story</p>
                    <p>{article?.content}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ArticleModal;
