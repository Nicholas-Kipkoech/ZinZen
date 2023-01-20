import { GoalItem } from "@src/models/GoalItem";
import { createContactRequest, getInstallId } from "@src/utils";

export const initRelationship = async () => {
  const url = "https://7i76q5jdugdvmk7fycy3owyxce0wdlqv.lambda-url.eu-west-1.on.aws/";

  const res = await createContactRequest(url, { method: "initiateRelationship", installId: getInstallId() });
  if (res.success) {
    const { relId } = res.response;
    return { success: true, response: { installId: getInstallId(), relId } };
  }
  return res;
};

export const acceptRelationship = async () => {
  const relId = window.location.pathname.split("/invite/")[1];
  const url = "https://7i76q5jdugdvmk7fycy3owyxce0wdlqv.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "acceptRelationship", installId: getInstallId(), relId });
  return res;
};

export const shareGoalWithContact = async (relId: string, goal: GoalItem) => {
  const url = "https://j6hf6i4ia5lpkutkhdkmhpyf4q0ueufu.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "shareGoal", installId: getInstallId(), relId, event: { type: "shareGoal", goal } });
  return res;
};

export const collaborateWithContact = async (relId: string, goal: GoalItem) => {
  const url = "https://j6hf6i4ia5lpkutkhdkmhpyf4q0ueufu.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "shareGoal", installId: getInstallId(), relId, event: { type: "collaboration", goal } });
  return res;
};

export const sendResponseOfColabInvite = async (status: string, relId: string, goalId: string) => {
  const url = "https://j6hf6i4ia5lpkutkhdkmhpyf4q0ueufu.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "shareGoal", installId: getInstallId(), relId, event: { type: "colabInviteResponse", goalId, status } });
  return res;
};

export const getContactSharedGoals = async () => {
  const lastProcessedTimestamp = new Date(Number(localStorage.getItem("lastProcessedTimestamp"))).toISOString();
  const url = "https://j6hf6i4ia5lpkutkhdkmhpyf4q0ueufu.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "getGoals", installId: getInstallId(), ...(lastProcessedTimestamp ? { lastProcessedTimestamp } : {}) });
  localStorage.setItem("lastProcessedTimestamp", `${Date.now()}`);
  return res;
};

export const getRelationshipStatus = async (relationshipId: string) => {
  const url = "https://7i76q5jdugdvmk7fycy3owyxce0wdlqv.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url, { method: "getRelationshipStatus", installId: getInstallId(), relationshipId });
  return res;
};

export const sendColabUpdatesToContact = async (relId: string, goalId:string, changes: object) => {
  const url = "https://j6hf6i4ia5lpkutkhdkmhpyf4q0ueufu.lambda-url.eu-west-1.on.aws/";
  const res = await createContactRequest(url,
    { method: "shareGoal",
      installId: getInstallId(),
      relId,
      event: {
        type: "collaborationChanges",
        goalId,
        changes
      }
    });
  return res;
};
