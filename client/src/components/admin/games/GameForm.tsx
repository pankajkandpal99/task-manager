import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  gameFormSchema,
  GameFormValues,
} from "../../../schema/admin/GameSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import ImageUploadManager from "../../general/ImageUploadManager";
import { resetGameState } from "../../../features/game/game.slice";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect, useState } from "react";

const categories = [
  "Action",
  "Adventure",
  "Sports",
  "Puzzle",
  "RPG",
  "Strategy",
  "Simulation",
  "Casual",
];

interface GameFormProps {
  onSubmit: (values: GameFormValues) => void;
  defaultValues?: Partial<GameFormValues>;
  isSubmitting?: boolean;
}

export function GameForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}: GameFormProps) {
  const dispatch = useAppDispatch();

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValues?.thumbnail && "publicUrl" in defaultValues.thumbnail) {
      setExistingImageUrl(defaultValues.thumbnail.publicUrl as string);
    }
  }, [defaultValues]);

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined as unknown as File,
      gameUrl: "",
      category: "",
      isFeatured: false,
      isNew: true,
      minPlayers: 1,
      maxPlayers: 100,
      ...defaultValues,
    },
  });

  const handleImageChange = (files: (string | File)[]) => {
    if (files.length === 0) {
      form.setValue("thumbnail", undefined as unknown as File);
      form.setError("thumbnail", {
        type: "required",
        message: "Thumbnail image is required",
      });
      return;
    }

    if (files[0] instanceof File) {
      form.setValue("thumbnail", files[0]);
      form.clearErrors("thumbnail");
    } else {
      form.setError("thumbnail", {
        type: "required",
        message: "Thumbnail image is required",
      });
    }
  };

  const handleFormSubmit = (values: GameFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    return () => {
      dispatch(resetGameState());
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter game title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <ImageUploadManager
                    images={
                      existingImageUrl
                        ? [existingImageUrl]
                        : field.value
                        ? [field.value]
                        : []
                    }
                    onChange={handleImageChange}
                    maxImages={1}
                    ButtonText="Upload Thumbnail"
                  />
                </FormControl>
                <FormDescription>
                  URL of the game thumbnail image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gameUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/game" {...field} />
                </FormControl>
                <FormDescription>URL where the game is hosted</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minPlayers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Players</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPlayers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Players</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Featured Game</FormLabel>
                  <FormDescription>
                    Show this game in featured section
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNew"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>New Game</FormLabel>
                  <FormDescription>
                    Mark this game as new release
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter game description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Game"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
