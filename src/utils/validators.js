export function validateTask(task) {
  const errors = {};

  if (!task.title || !task.title.trim()) {
    errors.title = "Title is required";
  }

  if (!task.dueDate) {
    errors.dueDate = "Due date is required";
  }

  return errors;
}