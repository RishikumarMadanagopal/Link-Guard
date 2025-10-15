import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const tips = [
  {
    title: "Verify the Domain Name",
    content:
      "Always double-check the URL's domain name. Phishers often use domains that are visually similar to legitimate ones, like 'paypa1.com' instead of 'paypal.com'.",
  },
  {
    title: "Look for HTTPS",
    content:
      "Legitimate websites that handle sensitive information use HTTPS, not HTTP. The 'S' stands for secure. Look for the padlock icon in your browser's address bar.",
  },
  {
    title: "Be Wary of Urgent or Threatening Language",
    content:
      "Phishing attempts often create a sense of urgency or fear to trick you into acting without thinking. Be skeptical of messages demanding immediate action.",
  },
  {
    title: "Hover Before You Click",
    content:
      "On a desktop computer, hover your mouse over any link before clicking it. The actual destination URL will appear in the bottom corner of your browser window. Make sure it matches what you expect.",
  },
  {
    title: "Never Enter Credentials After Clicking a Link",
    content:
      "If you receive an email asking you to log in to an account, it's safest to manually type the website's address into your browser instead of clicking the link in the email.",
  },
];

export function SafetyTips() {
  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline">
            <Lightbulb className="h-6 w-6 text-primary" />
            Phishing Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {tips.map((tip, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{tip.title}</AccordionTrigger>
                <AccordionContent>{tip.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
