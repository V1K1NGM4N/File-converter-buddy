interface AnimatedFileTypeProps {
  fileType: 'images' | 'videos' | 'files';
}

export const AnimatedFileType = ({ fileType }: AnimatedFileTypeProps) => {
  return (
    <span className="inline-block">
      {fileType}
    </span>
  );
};