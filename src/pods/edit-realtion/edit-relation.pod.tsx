import { OptionVm, SelectFormik } from '@/common/components/forms';

export const EditRelation: React.FC = () => {
  // const { canvasSchema } = useCanvasSchemaContext();
  const data: OptionVm[] = [
    {
      id: '1',
      label: 'Opción 1',
      children: [
        {
          id: '11',
          label: 'Subopción 1.1',
          children: [
            { id: '111', label: 'Sub-subopción 1.1.1' },
            { id: '112', label: 'Sub-subopción 1.1.2' },
          ],
        },
        { id: '12', label: 'Subopción 1.2' },
      ],
    },
    {
      id: '2',
      label: 'Opción 2',
      children: [
        { id: '21', label: 'Subopción 2.1' },
        { id: '22', label: 'Subopción 2.2' },
      ],
    },
  ];

  return (
    <>
      <form action="">
        <SelectFormik label="Type" options={data}></SelectFormik>
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
