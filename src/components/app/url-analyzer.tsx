"use client";

import { useFormState, useFormStatus } from "react-dom";
import { analyzeUrlAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Loader2, ScanLine, ShieldAlert, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

const initialState = {
  result: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <ScanLine className="mr-2 h-4 w-4" />
          Analyze URL
        </>
      )}
    </Button>
  );
}

export function UrlAnalyzer() {
  const [state, formAction] = useFormState(analyzeUrlAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleReport = () => {
    toast({
      title: "URL Reported",
      description: "Thank you for helping keep the internet safe!",
    });
  };

  useEffect(() => {
    if (state.error) {
        toast({
            variant: "destructive",
            title: "Analysis Error",
            description: state.error,
        });
    }
    if (state.result) {
      formRef.current?.reset();
    }
  }, [state, toast]);


  return (
    <section className="w-full text-center space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          Stay Ahead of Phishing Scams
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Enter any URL below and our AI will analyze it for potential phishing threats in real-time.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full">
              <Input
                type="url"
                name="url"
                placeholder="https://example.com"
                required
                className="text-center sm:text-left"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      {state.result && (
        <Card className="max-w-2xl mx-auto text-left animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {state.result.isPhishing ? (
                <ShieldAlert className="h-8 w-8 text-destructive" />
              ) : (
                <ShieldCheck className="h-8 w-8 text-chart-2" />
              )}
              <span className={state.result.isPhishing ? "text-destructive" : "text-chart-2"}>
                {state.result.isPhishing ? "Potential Phishing Detected" : "Looks Safe"}
              </span>
            </CardTitle>
            <CardDescription>
              Analysis of the provided URL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{state.result.explanation}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={handleReport}>
              <Flag className="mr-2 h-4 w-4" />
              Report this URL
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
