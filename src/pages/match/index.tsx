import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import { API_ENDPOINT } from "../../config/constants";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const MatchModal = () => {
  const [match, setMatch] = useState<MatchDetails | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { matchID } = useParams();
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const fetchMatch = () => {
    fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setIsOpen(true);
      });
  };

  useEffect(() => {
    fetchMatch();
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    {match?.name}
                  </Dialog.Title>
                  <div className="flex justify-between items-center mt-1 mb-3 gap-6">
                    <p className="text-sm">{match?.sportName}</p>
                    <div className="text-gray-500 flex items-center gap-2">
                      <div className="flex items-center text-sm gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <p>
                          {match?.startsAt &&
                            new Date(match.startsAt).toDateString()}
                        </p>
                      </div>
                      <p>to</p>
                      <p className="text-sm">
                        {match?.startsAt &&
                          new Date(match.startsAt).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="flex gap-2 items-center">
                      <p className="font-bold text-lg">Scores</p>
                      <button onClick={fetchMatch}>
                        <ArrowPathIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-semibold">
                            {match?.teams[0].name}:{"  "}
                          </span>
                          {match?.score[match?.teams[0].name]}
                        </div>
                        {match?.playingTeam === match?.teams[0].id && (
                          <span className="bg-blue-500 rounded-full px-2 text-white py-1 text-sm">
                            Playing
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-semibold">
                            {match?.teams[1].name}:{"  "}
                          </span>
                          {match?.score[match?.teams[1].name]}
                        </div>
                        {match?.playingTeam === match?.teams[1].id && (
                          <span className="bg-blue-500 rounded-full px-2 text-white py-1 text-sm">
                            Playing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="my-2">
                    <p className="font-bold text-lg">Story</p>
                    <p>{match?.story}</p>
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

export default MatchModal;
