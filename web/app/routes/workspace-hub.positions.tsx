import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { t } from "i18next";
import { WorkPositionClient } from "~/clients";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import { handleAxiosError, requireAdminRoleOrHigher } from "~/util";
import {
  PositionsCard,
  AddPositionsDialogForm,
  DeletePositionsWarningDialog,
} from "~/components/features";
import { parseWithZod } from "@conform-to/zod";
import { useEffect, useState } from "react";
import {
  IPositionResponse,
  IPositionRequest,
  BreadcrumbVariant,
  Status,
} from "~/types";
import {
  workspacePositionCreateSchema,
  workspacePositionUpdateSchema,
  deleteSchema,
} from "~/schemas";
import { displaySuccess } from "~/util/snackbar-success";
import { z } from "zod";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("intent", [
      workspacePositionCreateSchema,
      workspacePositionUpdateSchema,
      deleteSchema,
    ]),
  });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    switch (submission.value.intent) {
      case "create": {
        const createRequest: IPositionRequest = {
          name: submission.value.name,
          description: submission.value.description,
          level: submission.value.level,
          workPositionPromotionId: submission.value.workPositionPromotionId,
        };

        await WorkPositionClient.createWorkPosition(createRequest);
        displaySuccess(t("workspacePositions.positionCreated"));
        break;
      }
      case "update": {
        const updateRequest: IPositionRequest = {
          name: submission.value.name,
          description: submission.value.description,
          level: submission.value.level,
          workPositionPromotionId:
            submission.value.workPositionPromotionId ?? null,
        };
        await WorkPositionClient.updateWorkPosition(
          submission.value.id,
          updateRequest
        );
        displaySuccess(t("workspacePositions.positionUpdated"));
        break;
      }
      case "delete": {
        await WorkPositionClient.deleteWorkPosition(submission.value.id);
        displaySuccess(t("workspacePositions.positionDeleted"));
        break;
      }
      default:
        return null;
    }

    return json(submission.reply());
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  try {
    const workspacePositions = await WorkPositionClient.getWorkPositions(
      loaderArgs,
      DEFAULT_PAGINATION_LIMIT
    );

    return json(workspacePositions);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function WorkspacehubPositions() {
  const positions = useLoaderData<typeof clientLoader>();
  const lastResult = useActionData<typeof clientAction>();
  const [positionPopupOpen, setPositionPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPositionResponse | null>(
    null
  );
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  useEffect(() => {
    if (lastResult?.status === Status.Success) {
      setPositionPopupOpen(false);
      setDeletePopupOpen(false);
    }
  }, [lastResult]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspacePositions.positions"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <PositionsCard
        setDeletePopupOpen={setDeletePopupOpen}
        setPositionPopupOpen={setPositionPopupOpen}
        setSelectedItem={setSelectedItem}
        positions={positions}
      />
      <AddPositionsDialogForm
        positionPopupOpen={positionPopupOpen}
        positions={positions}
        selectedItem={selectedItem}
        setPositionPopupOpen={setPositionPopupOpen}
        lastResult={lastResult}
      />
      <DeletePositionsWarningDialog
        setDeletePopupOpen={setDeletePopupOpen}
        setSelectedItem={setSelectedItem}
        open={deletePopupOpen}
        positionPopupOpen={positionPopupOpen}
        selectedItem={selectedItem}
        lastResult={lastResult}
      />
    </AppLayout>
  );
}
