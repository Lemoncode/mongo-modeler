import { SelectFormik } from '@/common/components/forms';
import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';

export const EditRelation: React.FC = () => {
  const { canvasSchema } = useCanvasSchemaContext();

  console.log(canvasSchema);
  return (
    <>
      <form action="">
        <SelectFormik label="Type" data={canvasSchema}></SelectFormik>
        {/* <SelectFormik
          label="Origin Collection"
          data={canvasSchema.relations}
        ></SelectFormik> */}
      </form>
    </>
    // <Formik>
    //   {() => (
    //     <Form>
    //       <div className={classes.container}>
    //         <InputFormik label="Width" name="width" placeholder="Width" />
    //         <InputFormik label="Height" name="height" placeholder="Height" />
    //         <button type="submit">On Change Settings</button>
    //       </div>
    //     </Form>
    //   )}
    // </Formik>
  );
};
