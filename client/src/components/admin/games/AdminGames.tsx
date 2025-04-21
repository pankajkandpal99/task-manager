import { useEffect, useState } from "react";
import { GameForm } from "./GameForm";
import { GameFormValues } from "../../../schema/admin/GameSchema";
import { Button } from "../../ui/button";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  createGame,
  deleteGame,
  fetchAllGames,
  resetGameState,
  updateGame,
} from "../../../features/game/game.slice";
import { Pagination } from "../../general/Pagination";
import { DeleteConfirmationDialog } from "../../general/DeleteConfirmationDialog";

export const AdminGames = () => {
  const dispatch = useAppDispatch();
  const { games, error, loading, success } = useAppSelector(
    (state) => state.game
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameFormValues | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 10;
  const [actionType, setActionType] = useState<
    "create" | "update" | "delete" | null
  >(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleSubmit = (values: GameFormValues) => {
    if (currentGame && currentGame.id) {
      setActionType("update");
      dispatch(updateGame({ gameId: currentGame.id, gameData: values }));
    } else {
      setActionType("create");
      dispatch(createGame(values));
    }
  };

  const handleEdit = (game: GameFormValues) => {
    setCurrentGame(game);
    setIsEditing(true);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setGameToDelete({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (gameToDelete) {
      setActionType("delete");
      dispatch(deleteGame(gameToDelete.id));
      setDeleteDialogOpen(false);
      setGameToDelete(null);
    }
  };

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      if (actionType === "delete") {
        toast.success("Game deleted successfully");
      } else if (actionType === "update") {
        toast.success("Game updated successfully", {
          description: `${currentGame?.title} has been updated.`,
        });
      } else if (actionType === "create") {
        toast.success("Game added successfully", {
          description: "New game has been added to the collection.",
        });
      }

      setIsEditing(false);
      setCurrentGame(null);
      setCurrentPage(1);
      setActionType(null);

      dispatch(resetGameState());
      dispatch(fetchAllGames());
    }

    if (error) {
      toast.error("Operation failed", {
        description: error,
      });
      dispatch(resetGameState());
    }
  }, [success, error, dispatch, currentGame, actionType]);

  // Calculate paginated games
  const paginatedGames = games
    ? games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
    : [];
  const totalPages = games ? Math.ceil(games.length / gamesPerPage) : 0;

  return (
    <div className="space-y-6">
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Game"
        description="This action cannot be undone."
        itemName={gameToDelete?.title}
      />

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
          disabled={loading}
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
            isSubmitting={loading}
          />
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setIsEditing(false);
              setCurrentGame(null);
            }}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading games...
              </span>
            </div>
          ) : (
            <>
              {games && games.length > 0 ? (
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
                        {paginatedGames.map((game) => (
                          <TableRow key={game.id || game._id}>
                            <TableCell className="font-medium">
                              {game.title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{game.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {game.isFeatured && (
                                  <Badge variant="destructive">Featured</Badge>
                                )}
                                {game.isNew && (
                                  <Badge variant="secondary">New</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {game.players?.toLocaleString() || 0}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2 justify-end items-center mr-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(game)}
                                  disabled={loading}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteClick(
                                      game.id || game._id,
                                      game.title
                                    )
                                  }
                                  disabled={loading}
                                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No games found. Add your first game to get started.
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
