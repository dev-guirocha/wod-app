

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: COLORS.grayMedium,
    opacity: 0.7,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton;
