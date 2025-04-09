import { zodResolver } from "@hookform/resolvers/zod";
import {
  HeroSectionFormValues,
  heroSectionSchema,
} from "../../../../schema/admin/HeroSectionSchema";
import { HeroSectionContent } from "./HeroSectionTypes";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Image as ImageIcon, Plus, Trash2, Type } from "lucide-react";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import ImageUploadManager from "../../../general/ImageUploadManager";
import { toast } from "sonner";
import { useState } from "react";

interface HeroSectionFormProps {
  content: HeroSectionContent;
  onSubmit: (values: HeroSectionFormValues) => void;
}

const HeroSectionForm: React.FC<HeroSectionFormProps> = ({
  content,
  onSubmit,
}) => {
  const form = useForm<HeroSectionFormValues>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: {
      ...content,
      transitionDuration: content.transitionDuration || 3000,
    },
  });

  const {
    watch,
    setValue,
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = form;
  const currentValues = watch();
  const [scrollingTextInput, setScrollingTextInput] = useState("");

  const handleAddScrollingText = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      toast.error("Scrolling text cannot be empty");
      return;
    }

    if (trimmedText.length < 10) {
      toast.error("Scrolling text must be at least 10 characters");
      return;
    }

    const newTexts = [...currentValues.scrollingTexts, trimmedText];
    setValue("scrollingTexts", newTexts, { shouldValidate: true });

    setScrollingTextInput(""); // Clear the input field after adding
  };

  const handleRemoveScrollingText = (index: number) => {
    const newTexts = currentValues.scrollingTexts.filter((_, i) => i !== index);
    setValue("scrollingTexts", newTexts, { shouldValidate: true });
  };

  const handleImagesChange = (newImages: (string | File)[]) => {
    setValue("backgroundImages", newImages, { shouldValidate: true });
  };

  const processSubmit = async (values: HeroSectionFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error("Failed to save hero section. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(processSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        <div className="bg-card rounded-xl p-4 sm:p-6 border">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <Type className="h-4 w-4 sm:h-5 sm:w-5" /> Text Content
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <FormField
              control={control}
              name="mainHeading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Main Heading <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter main heading (min 5 characters)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="subHeading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sub Heading <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Enter sub heading (min 10 characters)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <FormField
                control={control}
                name="buttonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Button Text <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter button text (min 2 characters)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="transitionDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Transition Duration (ms){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1000}
                      max={10000}
                      step={500}
                      placeholder="Enter duration between 1000-10000ms"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active Section</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Toggle to show/hide this section
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-4 sm:p-6 border">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Background Images
              <span className="text-red-500">*</span>
            </h2>
            <FormField
              control={control}
              name="backgroundImages"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageUploadManager
                      images={currentValues.backgroundImages}
                      onChange={handleImagesChange}
                      maxImages={10}
                      ButtonText="Upload Image"
                      acceptedFormats="image/jpeg, image/png, image/webp"
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-card rounded-xl p-4 sm:p-6 border">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Type className="h-4 w-4 sm:h-5 sm:w-5" /> Scrolling Texts
              <span className="text-red-500">*</span>
            </h2>
            <FormField
              control={control}
              name="scrollingTexts"
              render={() => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Enter scrolling text (min 10 characters)"
                        className="flex-1"
                        value={scrollingTextInput}
                        onChange={(e) => setScrollingTextInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddScrollingText(scrollingTextInput);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full sm:w-auto cursor-pointer"
                        onClick={() =>
                          handleAddScrollingText(scrollingTextInput)
                        }
                        disabled={!scrollingTextInput.trim()}
                      >
                        <Plus className="h-4 w-4 mr-0" /> Add
                      </Button>
                    </div>

                    {currentValues.scrollingTexts.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No scrolling texts added yet
                      </p>
                    )}

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {currentValues.scrollingTexts.map((text, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 group"
                        >
                          <div className="flex-1 bg-muted rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                            {text}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={() => handleRemoveScrollingText(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="col-span-full flex justify-end mt-4 gap-4">
          {Object.keys(errors).length > 0 && (
            <p className="text-destructive text-sm mr-auto">
              Please fix the errors before submitting
            </p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HeroSectionForm;
