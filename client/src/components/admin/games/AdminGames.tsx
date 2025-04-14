import { useState } from "react";
import { GameForm } from "./GameForm";
import { GameFormValues } from "../../../schema/admin/GameSchema";
import { Button } from "../../ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { toast } from "sonner";

// Define the mock games generator function here since it's not imported
const generateMockGames = () => {
  const gameTitles = [
    "Battle Royale Legends",
    "Space Adventure",
    "Zombie Survival",
    "Racing Masters",
    "Puzzle Quest",
    "Fantasy Kingdom",
  ];

  const categories = [
    "Action",
    "Adventure",
    "Sports",
    "Puzzle",
    "RPG",
    "Strategy",
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `game-${i}`,
    title: gameTitles[i % gameTitles.length],
    thumbnail: `https://picsum.photos/300/300?random=${i}`,
    category: categories[i % categories.length],
    gameUrl: `https://example.com/game-${i}`,
    description: `Description for ${gameTitles[i % gameTitles.length]}`,
    players: Math.floor(Math.random() * 10000) + 1000,
    isFeatured: i % 5 === 0,
    isNew: i % 7 === 0,
    minPlayers: 1,
    maxPlayers: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export const AdminGames = () => {
  const [games, setGames] = useState(() => generateMockGames());
  const [isEditing, setIsEditing] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameFormValues | null>(null);

  const handleSubmit = (values: GameFormValues) => {
    if (currentGame) {
      // Update existing game
      setGames(
        games.map((g) => (g.id === currentGame.id ? { ...g, ...values } : g))
      );
      toast.success("Game updated successfully", {
        description: `${values.title} has been updated.`,
      });
    } else {
      // Add new game
      const newGame = {
        ...values,
        id: `game-${games.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        players: Math.floor(Math.random() * 10000) + 1000,
        description: values.description || "No description provided",
      };
      setGames([...games, newGame]);
      toast.success("Game added successfully", {
        description: `${values.title} has been added to the collection.`,
      });
    }
    setIsEditing(false);
    setCurrentGame(null);
  };

  const handleEdit = (game: GameFormValues) => {
    setCurrentGame(game);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setGames(games.filter((game) => game.id !== id));
    toast.error("Game deleted", {
      description: "The game has been removed from the collection.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] bg-clip-text text-transparent">
          Games Management
        </h1>
        <Button
          onClick={() => {
            setIsEditing(true);
            setCurrentGame(null);
          }}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      {isEditing ? (
        <div className="bg-card rounded-lg px-6 py-3">
          <h4 className="text-lg font-medium mb-4">
            {currentGame ? "Edit Game" : "Add New Game"}
          </h4>
          <GameForm
            onSubmit={handleSubmit}
            defaultValues={currentGame || undefined}
          />
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setIsEditing(false);
              setCurrentGame(null);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead className="flex items-center justify-end mr-1">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium">{game.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{game.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {game.isFeatured && (
                          <Badge variant="destructive">Featured</Badge>
                        )}
                        {game.isNew && <Badge variant="secondary">New</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>{game.players.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end items-center mr-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(game)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(game.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {games.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No games found. Add your first game to get started.
            </div>
          )}
        </>
      )}
    </div>
  );
};
