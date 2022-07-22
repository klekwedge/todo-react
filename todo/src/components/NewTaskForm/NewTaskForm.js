import { useState } from "react";
import {
  Select,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import format from "date-fns/format";

import "react-datepicker/dist/react-datepicker.css";
import "./NewTaskForm.scss";

// const datePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [isOpen, setIsOpen] = useState(false);
//   const handleChange = (e) => {
//     setIsOpen(!isOpen);
//     setStartDate(e);
//   };
//   const handleClick = (e) => {
//     e.preventDefault();
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button className="example-custom-input" onClick={handleClick}>
//         {format(startDate, "dd-MM-yyyy")}
//       </button>
//       {isOpen && (
//         <DatePicker selected={startDate} onChange={handleChange} inline />
//       )}
//     </>
//   );
// };

// <Button onClick={onOpen}>Open Modal</Button>

// <Modal isOpen={isOpen} onClose={onClose}>
//   <ModalOverlay />
//   <ModalContent>
//     <ModalHeader>Modal Title</ModalHeader>
//     <ModalCloseButton />
//     <ModalBody>
//       <Lorem count={2} />
//     </ModalBody>

//     <ModalFooter>
//       <Button colorScheme='blue' mr={3} onClick={onClose}>
//         Close
//       </Button>
//       <Button variant='ghost'>Secondary Action</Button>
//     </ModalFooter>
//   </ModalContent>
// </Modal>

function NewTaskForm({ updateTaskBuff }) {
  const [taskNameInput, setTaskNameInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [optionCategory, setOptionCategory] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDatePicker,
    onOpen: onOpenDatePicker,
    onClose: onCloseDatePicker,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(new Date());

  const handleChangeDatePicker = (e) => {
    onCloseDatePicker();
    setStartDate(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTaskBuff(taskNameInput, optionCategory, taskDescription);
    setTaskNameInput("");
    setOptionCategory("");
    setTaskDescription("");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Button
        borderRadius="50%"
        position="absolute"
        width="40px"
        height="40px"
        top="160px"
        right="30px"
        onClick={onOpen}
      >
        <IconButton icon={<AddIcon />} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="new-task" onSubmit={handleSubmit}>
              <div className="new-task__wrapper">
                <input
                  type="text"
                  className="new-task__input"
                  value={taskNameInput}
                  required
                  onChange={(e) => setTaskNameInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <label className="new-task__label">New task</label>
                <button type="submit" className="new-task__button">
                  Add
                </button>
              </div>

              <div className="new-task__wrapper">
                <input
                  type="text"
                  className="new-task__input"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
                <label className="new-task__label">
                  What do you need to do?
                </label>
              </div>

              <Flex gap="10px">
                <Select
                  placeholder="Select category"
                  onChange={(e) => setOptionCategory(e.target.value)}
                  value={optionCategory}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="study">Study</option>
                  <option value="other">Other</option>
                </Select>

                <Button
                  className="example-custom-input"
                  onClick={onOpenDatePicker}
                >
                  {format(startDate, "dd-MM-yyyy")}
                </Button>

                <Modal isOpen={isOpenDatePicker} onClose={onCloseDatePicker}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Choose deadline:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex justifyContent="center" minHeight="280px">
                        <DatePicker
                          selected={startDate}
                          onChange={handleChangeDatePicker}
                          inline
                        />
                      </Flex>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewTaskForm;
