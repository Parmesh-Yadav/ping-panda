'use client'

import { Card } from "@/components/card";
import { CreateEventCategoryModal } from "@/components/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DashboardEmptyState = () => {

    const queryClient = useQueryClient();

    const { mutate: insertQuickStartCategories, isPending } = useMutation({
        mutationFn: async () => {
            await client.category.insertQuickStartCategories.$post();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'user-event-categories' })
        },
    });

    return (
        <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
            <div className="flex justify-center w-full">
                <img
                    src="/brand-asset-wave.png"
                    alt="No Categries"
                    className="size-48 -mt-24"
                />
            </div>
            <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
                No event categories yet.
            </h1>
            <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
                Start tracking events by creating your first category.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                    variant='outline'
                    className="flex items-center space-x-2 w-full sm:w-auto"
                    onClick={() => insertQuickStartCategories()}
                    disabled={isPending}
                >
                    <span className="size-5">🚀</span>
                    <span>
                        {
                            isPending
                                ? 'Creating...'
                                : 'Quickstart'
                        }
                    </span>
                </Button>
                <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
                    <Button className="flex items-center space-x-2 w-full sm:w-auto">
                        <span className="size-5">💫</span>
                        <span>Add Category</span>
                    </Button>
                </CreateEventCategoryModal>
            </div>
        </Card>
    )
}