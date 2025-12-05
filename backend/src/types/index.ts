import z from "zod";

export const SignupData = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(5),
});

export const SigninData = z.object({
  username: z.string(),
  password: z.string(),
});

export const zapData = z.object({
  availableTriggerId: z.string(),
  triggerMetaData: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
