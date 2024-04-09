import { db } from "@src/models";

export const getGoalHint = async (goalId: string) => {
  const hint = await db.hintsCollection.where("id").equals(goalId).toArray();
  return hint.length > 0 ? hint[0].hint : null;
};

export const saveHint = async (goalId: string, hint: boolean) => {
  const hintObject = { id: goalId, hint };
  await db
    .transaction("rw", db.hintsCollection, async () => {
      await db.hintsCollection.add(hintObject);
    })
    .catch((e) => {
      console.log(e.stack || e);
    });
};

export const updateHint = async (goalId: string, hint: boolean) => {
  await db
    .transaction("rw", db.hintsCollection, async () => {
      const existingItem = await db.hintsCollection.where("id").equals(goalId).first();
      if (existingItem) {
        await db.hintsCollection.update(goalId, { hint });
      } else {
        await saveHint(goalId, hint);
      }
    })
    .catch((e) => {
      console.log(e.stack || e);
    });
};

export const deleteHint = async (goalId: string) => {
  await db
    .transaction("rw", db.hintsCollection, async () => {
      await db.hintsCollection.delete(goalId);
    })
    .catch((e) => {
      console.log(e.stack || e);
    });
};
