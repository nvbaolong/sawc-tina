"use client";

import React, { useCallback } from "react";
import { StringInputProps, set, unset, PatchEvent } from "sanity";
import { Flex, Button, Text, Stack } from "@sanity/ui";
import { ResetIcon, PlayIcon, UploadIcon } from "@sanity/icons";
import { useDocumentPane } from "sanity/structure";

export const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/watch?v=QxQYOZdQGQ8";

export function VideoTypeInput(props: StringInputProps) {
  const { value = "youtube", onChange } = props;

  let docPaneOnChange: ((event: PatchEvent) => void) | null = null;
  try {
    const docPane = useDocumentPane();
    docPaneOnChange = docPane.onChange;
  } catch {
    // Fallback if rendered outside of document pane
  }

  const handleSelectType = useCallback(
    (newType: "youtube" | "upload") => {
      onChange(set(newType));
    },
    [onChange]
  );

  const handleResetToDefault = useCallback(() => {
    if (docPaneOnChange) {
      docPaneOnChange(
        PatchEvent.from([
          set("youtube", ["videoType"]),
          set(DEFAULT_YOUTUBE_URL, ["videoUrl"]),
          unset(["videoFile"]),
        ])
      );
    } else {
      onChange(set("youtube"));
    }
  }, [docPaneOnChange, onChange]);

  const currentType = value === "upload" ? "upload" : "youtube";

  return (
    <Stack space={3}>
      <Flex gap={2} wrap="wrap">
        <Button
          type="button"
          icon={PlayIcon}
          mode={currentType === "youtube" ? "default" : "ghost"}
          tone={currentType === "youtube" ? "primary" : "default"}
          text="1. YouTube Link"
          onClick={() => handleSelectType("youtube")}
        />
        <Button
          type="button"
          icon={UploadIcon}
          mode={currentType === "upload" ? "default" : "ghost"}
          tone={currentType === "upload" ? "primary" : "default"}
          text="2. Upload Video (Sanity CDN)"
          onClick={() => handleSelectType("upload")}
        />
        <Button
          type="button"
          icon={ResetIcon}
          mode="ghost"
          tone="critical"
          text="Reset to Default YouTube"
          title={`Reset to default YouTube video (${DEFAULT_YOUTUBE_URL})`}
          onClick={handleResetToDefault}
        />
      </Flex>
      <Text size={1} muted>
        {currentType === "youtube"
          ? "Mode: YouTube Video. Displaying YouTube URL field below."
          : "Mode: Upload Video. Displaying video upload box below."}
      </Text>
    </Stack>
  );
}

export function VideoUrlInput(props: StringInputProps) {
  const { value, onChange } = props;

  const handleReset = useCallback(() => {
    onChange(set(DEFAULT_YOUTUBE_URL));
  }, [onChange]);

  const isDefault = value === DEFAULT_YOUTUBE_URL;

  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      {!isDefault && (
        <Flex align="center" gap={2}>
          <Button
            type="button"
            icon={ResetIcon}
            mode="ghost"
            tone="default"
            fontSize={1}
            padding={2}
            text="Reset to default URL"
            onClick={handleReset}
          />
          <Text size={1} muted>
            Default: {DEFAULT_YOUTUBE_URL}
          </Text>
        </Flex>
      )}
    </Stack>
  );
}
