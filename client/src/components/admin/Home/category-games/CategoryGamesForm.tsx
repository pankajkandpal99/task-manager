import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryGamesFormValues,
  CategoryGamesSchema,
} from "../../../../schema/admin/CategoryGamesSchema";
import { CategoryGamesContent } from "./CategoryGamesTypes";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Plus, Trash2, Type, Gamepad2, List, Award } from "lucide-react";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface CategoryGamesFormProps {
  content: CategoryGamesContent;
  onSubmit: (values: CategoryGamesFormValues) => void;
}

const CategoryGamesForm: React.FC<CategoryGamesFormProps> = ({
  content,
  onSubmit,
}) => {
  const form = useForm<CategoryGamesFormValues>({
    resolver: zodResolver(CategoryGamesSchema),
    defaultValues: {
      ...content,
      categories: content?.categories || [],
      games: content?.games || [],
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
  const [categoryInput, setCategoryInput] = useState("");
  const [gameInput, setGameInput] = useState({
    title: "",
    category: "",
    image: "",
    players: "",
    prize: 0,
    hot: false,
    tags: [],
  });

  const handleAddCategory = (category: string) => {
    const trimmedCategory = category.trim();
    if (!trimmedCategory) {
      toast.error("Category cannot be empty");
      return;
    }

    if (trimmedCategory.length < 2) {
      toast.error("Category must be at least 2 characters");
      return;
    }

    const newCategories = [
      ...(currentValues.categories || []),
      trimmedCategory,
    ];
    setValue("categories", newCategories, { shouldValidate: true });
    setCategoryInput("");
  };

  const handleRemoveCategory = (index: number) => {
    const newCategories = currentValues.categories.filter(
      (_, i) => i !== index
    );
    setValue("categories", newCategories, { shouldValidate: true });
  };

  const handleAddGame = () => {
    if (!gameInput.title || gameInput.title.length < 2) {
      toast.error("Game title must be at least 2 characters");
      return;
    }

    if (!gameInput.category || gameInput.category.length < 2) {
      toast.error("Game category must be at least 2 characters");
      return;
    }

    if (!gameInput.image) {
      toast.error("Game image URL is required");
      return;
    }

    const newGame = {
      id: Date.now(), // Temporary ID
      title: gameInput.title,
      category: gameInput.category,
      image: gameInput.image,
      players: gameInput.players || "0 playing",
      prize: gameInput.prize || 0,
      hot: gameInput.hot,
      tags: gameInput.tags,
    };

    const newGames = [...(currentValues.games || []), newGame];
    setValue("games", newGames, { shouldValidate: true });
    setGameInput({
      title: "",
      category: "",
      image: "",
      players: "",
      prize: 0,
      hot: false,
      tags: [],
    });
  };

  const handleRemoveGame = (id: number) => {
    const newGames = currentValues.games.filter((game) => game.id !== id);
    setValue("games", newGames, { shouldValidate: true });
  };

  const processSubmit = async (values: CategoryGamesFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error("Failed to save category games. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-4 sm:p-6 border">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Type className="h-4 w-4 sm:h-5 sm:w-5" /> Section Content
              </h2>

              <div className="space-y-4">
                <FormField
                  control={control}
                  name="sectionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter section title (min 5 characters)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="sectionDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="Enter section description (min 10 characters)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="viewAllButtonText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        View All Button Text{" "}
                        <span className="text-red-500">*</span>
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

            <div className="bg-card rounded-xl p-4 sm:p-6 border">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <List className="h-4 w-4 sm:h-5 sm:w-5" /> Categories
                <span className="text-red-500">*</span>
              </h2>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter category name (min 2 characters)"
                    className="flex-1"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCategory(categoryInput);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => handleAddCategory(categoryInput)}
                    disabled={!categoryInput.trim()}
                  >
                    <Plus className="h-4 w-4 mr-0" /> Add
                  </Button>
                </div>

                {currentValues.categories.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No categories added yet
                  </p>
                )}

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {currentValues.categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <div className="flex-1 bg-muted rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                        {category}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-4 sm:p-6 border">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5" /> Add New Game
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Game title"
                      value={gameInput.title}
                      onChange={(e) =>
                        setGameInput({ ...gameInput, title: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Game category"
                      value={gameInput.category}
                      onChange={(e) =>
                        setGameInput({ ...gameInput, category: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium leading-none">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="https://example.com/image.png"
                    value={gameInput.image}
                    onChange={(e) =>
                      setGameInput({ ...gameInput, image: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Players Text
                    </label>
                    <Input
                      placeholder="e.g., '1,234 playing'"
                      value={gameInput.players}
                      onChange={(e) =>
                        setGameInput({ ...gameInput, players: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Prize Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={gameInput.prize}
                      onChange={(e) =>
                        setGameInput({
                          ...gameInput,
                          prize: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hot-game"
                    checked={gameInput.hot}
                    onCheckedChange={(checked) =>
                      setGameInput({ ...gameInput, hot: !!checked })
                    }
                  />
                  <label
                    htmlFor="hot-game"
                    className="text-sm font-medium leading-none"
                  >
                    Mark as Hot Game
                  </label>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleAddGame}
                  disabled={
                    !gameInput.title || !gameInput.category || !gameInput.image
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Game
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 sm:p-6 border">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5" /> Current Games
                <span className="text-red-500">*</span>
              </h2>

              {currentValues.games.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No games added yet
                </p>
              )}

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {currentValues.games.map((game) => (
                  <div
                    key={game.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{game.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {game.category} • {game.players} • ₹{game.prize}
                        </p>
                        {game.hot && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-500 rounded-full">
                            Hot Game
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0"
                        onClick={() => handleRemoveGame(game.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {Object.keys(errors).length > 0 && (
            <p className="text-destructive text-sm mr-auto">
              Please fix the errors before submitting
            </p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryGamesForm;
