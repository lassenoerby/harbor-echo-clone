
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface InvoiceSectionProps {
  taskId: string;
  taskType: string | undefined;
  price: number | undefined;
  invoiceSent: boolean | undefined;
  invoiceSentDate: string | undefined;
  onSendInvoice: () => void;
}

export const InvoiceSection = ({ 
  taskId, 
  taskType, 
  price, 
  invoiceSent, 
  invoiceSentDate,
  onSendInvoice
}: InvoiceSectionProps) => {
  const { toast } = useToast();

  const handleSendInvoice = () => {
    if (!price) {
      toast({
        title: "Missing Price",
        description: "Please set a price before sending an invoice.",
        variant: "destructive"
      });
      return;
    }

    if (taskType !== "boater") {
      toast({
        title: "Not a Boater Task",
        description: "Invoices can only be sent for boater tasks.",
        variant: "destructive"
      });
      return;
    }

    onSendInvoice();
  };

  if (taskType !== "boater") {
    return null;
  }

  return (
    <div className="space-y-3 border-t pt-3 mt-4">
      <h3 className="font-medium">Invoice Status</h3>
      
      {invoiceSent ? (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Invoice sent</span>
          </div>
          {invoiceSentDate && (
            <div className="text-sm text-gray-500">
              Sent on {format(new Date(invoiceSentDate), "MMMM d, yyyy 'at' h:mm a")}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
            <span>Invoice not sent</span>
          </div>
          <Button 
            onClick={handleSendInvoice} 
            className="flex items-center" 
            variant="outline"
            size="sm"
            disabled={!price}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
          {!price && (
            <div className="text-xs text-gray-500">
              Please set a price before sending an invoice.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
