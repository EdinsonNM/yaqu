import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UploadMenuImageUseCase } from "@domain/menu/usecases/upload-image-menu.usecase";

export const useMenuUploadImage = () => {
  const uploadMenuImageUseCase = container.resolve(UploadMenuImageUseCase);

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      uploadMenuImageUseCase.execute(id, file),
  });
};
