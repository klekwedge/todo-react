import { Flex, Stack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/react";

import { useCategoryTask } from "../../hooks/useCategoryTask";

import "./TaskDetail.scss";

function TaskDetail({ currentTask }) {
  const categoryTask = useCategoryTask(currentTask.category);
  console.log(currentTask)

  const showDetails = () => {
    return (
      <Flex flexDirection="column" gap="2px" position="relative">
        <h3 className="task-detail__name">{currentTask.nameTask}</h3>

        <h3 className="task-detail__category">
          {currentTask.category ? categoryTask : "Not category"}
        </h3>

        <h3 className="task-detail__status">
          Status: {currentTask.complete === "true" ? "Done" : "Active"}
        </h3>

        <h3 className="task-detail__descr">
          Deadline:{" "}
        
          {currentTask.deadline ? currentTask.deadline : "No deadline"}
        </h3>

        <h3 className="task-detail__descr">
          Description:{" "}
          {currentTask.description
            ? currentTask.description
            : "Not description"}
        </h3>

        <h3 className="task-detail__date">
          Task creation date: {currentTask.creationDate[0].slice(0, -5)}.
          {currentTask.creationDate[0].slice(8)} ({currentTask.creationDate[1]})
        </h3>
      </Flex>
    );
  };

  return (
    <section className="task-detail">
      <h2 className="task-detail__title">Task details:</h2>
      {currentTask.nameTask ? (
        showDetails()
      ) : (
        <Flex flexDirection="column">
          <Flex alignItems="center" gap="5px" mb="20px">
            <ArrowBackIcon />
            <h3>Please, choose task</h3>
          </Flex>
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Flex>
      )}
    </section>
  );
}

export default TaskDetail;
