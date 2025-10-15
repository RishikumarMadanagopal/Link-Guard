"use server";

import { analyzeUrl as analyzeUrlFlow, type AnalyzeUrlOutput } from "@/ai/flows/phishing-detection-analysis";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

type State = {
  result: AnalyzeUrlOutput | null;
  error: string | null;
};

export async function analyzeUrlAction(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = formSchema.safeParse({
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.url?.[0] || "Invalid input.",
    };
  }
  
  try {
    const result = await analyzeUrlFlow({ url: validatedFields.data.url });
    return {
      result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      result: null,
      error: "An unexpected error occurred during analysis. Please try again.",
    };
  }
}
